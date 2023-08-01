import { NextPage } from "next";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PinInput from "../Otp input/PinInput";

interface UserCard {
  name: string;
  avatar: string;
}

const UserCard: NextPage<UserCard> = ({ name, avatar }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button onClick={openModal} className="group flex-row w-44 mx-auto pb-4">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <Image
            draggable={false}
            className="w-max h-max object-contain"
            src={avatar}
            alt={name}
            width={190}
            height={190}
          />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
          {name}
        </div>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black  bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl  transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <div className="text-base md:text-lg font-medium leading-6 text-zinc-600 text-center ">
                      &quot; Profile Lock is currently on &quot;
                    </div>
                    <div className="text-center text-4xl font-medium text-zinc-200 ">
                      Enter Your Pin to acess this Profile
                    </div>
                    <div className="flex flex-row justify-center items-center py-7 space-x-2">
                      <PinInput/>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};






export default UserCard;
