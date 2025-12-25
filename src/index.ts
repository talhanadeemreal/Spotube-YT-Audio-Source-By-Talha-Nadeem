import AudioSourceEndpoint from './segments/audio_source'
import type { IPlugin } from "@spotube-app/plugin"

class YouTubeAudioSourcePlugin implements IPlugin {
  audioSource: AudioSourceEndpoint;

  constructor() {
    this.audioSource = new AudioSourceEndpoint()
  }
}

export = YouTubeAudioSourcePlugin;