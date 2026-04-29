"use client";
import audiofile from "../../assets/testaudio.mp3";

import WavesurferPlayer from "@wavesurfer/react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useState } from "react";
const AudioPlayer = ({ width }) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className=" flex gap-4 items-center">
      <WavesurferPlayer
        barWidth={6}
        barHeight={5}
        barGap={8}
        barRadius={5}
        width={width}
        height={70}
        waveColor="#D9D9D9"
        progressColor="#005DAD"
        url={audiofile}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        className=" bg-[#005DAD] aspect-square h-12  rounded-full flex justify-center items-center text-white"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <FaPause className=" text-2xl" />
        ) : (
          <FaPlay className=" text-xl" />
        )}
      </button>
    </div>
  );
};
export default AudioPlayer;
