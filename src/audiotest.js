const { NodeAudio, StereoPannerNode, GainNode, SoundBuffer, PluginNode } = require("node-audio");

const ctx = NodeAudio.makeAudioContext();

const panNode = new StereoPannerNode(ctx.sampleRate());
panNode.pan().setValue(0);

const gainNode = new GainNode(ctx.sampleRate());
gainNode.gain().setValue(0.5);

const pluginNode = new PluginNode("~/Library/Audio/Plug-Ins/VST3", ctx.sampleRate());

gainNode.connect(ctx, panNode, 0, 0);
panNode.connect(ctx, pluginNode, 0, 0);
pluginNode.connect(ctx, ctx.destination(), 0, 0);

const buffer = new SoundBuffer("./file_example_WAV_1MG.wav", ctx.sampleRate());
buffer.playOnNode(ctx, gainNode, 0);

while (true) {}
