import React from 'react';
import {AiFillPlayCircle} from 'react-icons/ai'
import { useRouter } from 'next/navigation';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/movies/${movieId}`)}
      className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
      >
        <AiFillPlayCircle className="w-4 md:w-7 text-black mr-1" />
        Play
    </button>
  );
}

export default PlayButton;