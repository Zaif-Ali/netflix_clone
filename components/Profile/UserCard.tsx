/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";

interface UserCard {
  name: string;
  avatar: string;
}

const UserCard: NextPage<UserCard> = ({ name, avatar }) => {
  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <img
          draggable={false}
          className="w-max h-max object-contain"
          src={avatar}
          alt={name}
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};

export default UserCard;
