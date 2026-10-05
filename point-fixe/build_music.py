#!/usr/bin/env python3
"""Composition électro instrumentale originale pour l'animation de point fixe.

Tous les sons sont synthétisés ici : aucun enregistrement extérieur.
Reproduction : python3 build_music.py, puis ffmpeg pour ajouter le WAV au MP4.
"""
from pathlib import Path
import json, math, wave
import numpy as np
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parent
SR, DURATION, BPM = 32000, 222, 108
BEAT = 60 / BPM
N = SR * DURATION
mix = np.zeros((N, 2), dtype=np.float32)
rng = np.random.default_rng(1042026)

def frequency(midi):
    return 440 * 2 ** ((midi - 69) / 12)

def add(sound, start, gain=1., pan=0.):
    offset = int(round(start * SR))
    if offset >= N: return
    stop = min(N, offset + len(sound))
    a = np.asarray(sound[:stop-offset], dtype=np.float32) * gain
    if a.ndim == 1:
        mix[offset:stop, 0] += a * math.sqrt((1-pan)/2)
        mix[offset:stop, 1] += a * math.sqrt((1+pan)/2)
    else:
        mix[offset:stop] += a

def envelope(t, attack=.005, decay=.5):
    return np.minimum(1, t/attack) * np.exp(-t/decay) * np.minimum(1,(t[-1]-t)/.035)

def bass(midi, seconds=.5):
    t = np.arange(int(seconds*SR),dtype=np.float32)/SR
    phase = 2*np.pi*frequency(midi)*t
    sound = np.sin(phase) + .18*np.sin(2*phase) + .035*np.sin(3*phase)
    return sound * envelope(t,.009,.24)

def key(midi, seconds=1.5):
    t = np.arange(int(seconds*SR),dtype=np.float32)/SR
    phase = 2*np.pi*frequency(midi)*t
    body = np.sin(phase + 1.3*np.sin(2*phase)*np.exp(-t/0.12))
    body += .13*np.sin(2*phase)*np.exp(-t/.2)
    return body * envelope(t,.007,.37)

def pad(chord, seconds):
    t = np.arange(int(seconds*SR),dtype=np.float32)/SR
    result = np.zeros((len(t),2),dtype=np.float32)
    amp = np.minimum(1,t/.24) * np.minimum(1,(seconds-t)/.8)
    for j,midi in enumerate(chord):
        phase=2*np.pi*frequency(midi)*t
        for side in (0,1):
            detune=1+(-1 if side==0 else 1)*.0017
            warm=np.sin(phase*detune)+.16*np.sin(phase*2*detune)+.05*np.sin(phase*3*detune)
            trem=.96+.04*np.sin(2*np.pi*.19*t+j)
            result[:,side] += warm*amp*trem/len(chord)
    return result

t = np.arange(int(.38*SR),dtype=np.float32)/SR
phase = 2*np.pi*(48*t+(72/32)*(1-np.exp(-32*t)))
kick = (np.sin(phase) + .05*rng.normal(size=len(t))*np.exp(-t/.006)) * envelope(t,.003,.09)

t = np.arange(int(.19*SR),dtype=np.float32)/SR
noise = sosfilt(butter(2,[1100,6500],btype='bandpass',fs=SR,output='sos'),rng.normal(size=len(t)))
clap = noise * envelope(t,.001,.034)

t = np.arange(int(.075*SR),dtype=np.float32)/SR
noise = sosfilt(butter(2,[6900,13700],btype='bandpass',fs=SR,output='sos'),rng.normal(size=len(t)))
hat = noise * envelope(t,.001,.013)

# Quatre harmonies, chacune tenue sur deux mesures.
chords = [[50,57,60,65],[46,53,57,62],[48,53,57,67],[48,55,59,62]]
roots = [38,34,41,36]
keys = [[62,65,69,72],[58,62,65,69],[60,65,69,67],[60,64,67,74]]
bars = int(math.ceil(DURATION/(4*BEAT)))
for bar in range(bars):
    start = bar * 4 * BEAT
    harmony = (bar//2)%4
    section = 'intro' if bar<4 else ('break' if 44<=bar<52 or 80<=bar<84 else 'body')
    if bar%2==0:
        add(pad(chords[harmony],8*BEAT+.7),start,.073 if section!='break' else .086)
    # Une mélodie syncopée, avec réponses espacées et échos légers.
    pattern = [0,2,1,3] if bar%2==0 else [2,1,0,2]
    for j,step in enumerate([.0,.75,1.75,3.0]):
        note = keys[harmony][pattern[j]] + (12 if bar%16 in (14,15) and j==3 else 0)
        sound = key(note)
        level=.048 if section!='break' else .034
        pan=[-.35,.26,-.2,.38][j]
        add(sound,start+step*BEAT,level,pan)
        add(sound,start+(step+.75)*BEAT,level*.15,-pan)
        add(sound,start+(step+1.5)*BEAT,level*.07,pan)
    if section=='body':
        for step in [0,1,2,3]:
            add(kick,start+step*BEAT,.095)
        for step in [1,3]:
            add(clap,start+step*BEAT,.039,-.12)
        for j in range(8):
            add(hat,start+j*.5*BEAT,.016 if j%2 else .010,.28 if j%2 else -.28)
        for j,step in enumerate([0,.75,1.5,2.5,3.25]):
            midi=roots[harmony]+(12 if j==4 and bar%2 else 0)
            add(bass(midi),start+step*BEAT,.068)
    elif section=='break' and bar%2:
        for step in [.5,1.5,2.5,3.5]:add(hat,start+step*BEAT,.007,.2)

# Une légère réverbération stéréo, puis une ouverture et une sortie progressives.
for delay,gain in [(.027,.08),(.061,.045),(.117,.025)]:
    offset=int(delay*SR)
    mix[offset:] += mix[:-offset,::-1].copy()*gain
time=np.arange(N,dtype=np.float32)/SR
mix *= (np.minimum(1,time/4)*np.minimum(1,(DURATION-time)/8))[:,None]
peak=float(np.max(np.abs(mix)))
rms=float(np.sqrt(np.mean(mix**2)))
# Le fond reste discret : RMS à -25,5 dBFS, sans saturation.
target=10**(-25.5/20)
mix *= min(target/max(rms,1e-12), .65/max(peak,1e-12))
peak=float(np.max(np.abs(mix)))
rms=float(np.sqrt(np.mean(mix**2)))
pcm=(np.clip(mix,-1,1)*32767).astype('<i2')
path=ROOT/'Fond_electro_original.wav'
with wave.open(str(path),'wb') as out:
    out.setnchannels(2);out.setsampwidth(2);out.setframerate(SR);out.writeframes(pcm.tobytes())
print(json.dumps({'file':str(path),'duration':DURATION,'bpm':BPM,'sample_rate':SR,'peak_dbfs':20*math.log10(peak),'rms_dbfs':20*math.log10(rms),'bytes':path.stat().st_size}))
