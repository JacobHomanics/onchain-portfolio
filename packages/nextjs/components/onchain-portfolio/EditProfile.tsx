"use client";

import { useEffect, useState } from "react";
import { InputBase } from "../scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type Props = {
  name?: string | null;
  description?: string | null;
  image?: string | null;
  isUsingProfile?: boolean;
  isUsingEns?: boolean;
  refetch?: any;
  onCheckChange?: any;
  onExitEditMode?: any;
};

export const EditProfile = ({
  name,
  description,
  image,
  isUsingProfile,
  isUsingEns,
  refetch,
  onCheckChange,
  onExitEditMode,
}: Props) => {
  const [isUsingProfileValue, setIsUsingProfileValue] = useState(false);
  const [isUsingEnsValue, setIsUsingEnsValue] = useState(false);
  const [nameValue, setNameValue] = useState<string>(name || "");
  const [descriptionValue, setDescriptionValue] = useState<string>(description || "");
  const [imageUrlValue, setImageUrlValue] = useState<string>(image || "");

  useEffect(() => {
    if (!name) return;
    setNameValue(name);
  }, [name]);

  useEffect(() => {
    if (!description) return;
    setDescriptionValue(description);
  }, [description]);

  useEffect(() => {
    if (!image) return;
    setImageUrlValue(image);
  }, [image]);

  useEffect(() => {
    if (isUsingProfile === undefined) return;
    setIsUsingProfileValue(isUsingProfile);
  }, [isUsingProfile]);

  useEffect(() => {
    if (isUsingEns === undefined) return;
    setIsUsingEnsValue(isUsingEns);
  }, [isUsingEns]);

  const { writeContractAsync: writeProfileAsync } = useScaffoldWriteContract("Profile");

  const [profileUpdated, setProfileUpdated] = useState(false);

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        {profileUpdated ? <p>Profile Succesfully updated!</p> : <></>}

        <label>
          <input
            type="checkbox"
            className="m-4"
            checked={isUsingEnsValue}
            onChange={async () => {
              if (onCheckChange) await onCheckChange(!isUsingEnsValue);

              await writeProfileAsync({
                functionName: "setProfile2",
                args: [nameValue, descriptionValue, imageUrlValue, !isUsingProfile, !isUsingEnsValue],
              });
              setProfileUpdated(true);
              setIsUsingEnsValue(!isUsingEnsValue);
              setIsUsingProfileValue(!isUsingProfileValue);
              if (refetch) refetch();
            }}
          />
          Use ENS?
        </label>
        {isUsingEnsValue ? (
          <></>
        ) : (
          <div className="flex flex-col items-center bg-secondary rounded-xl p-4">
            <p>Profile</p>
            <div className="flex flex-col gap-1.5 w-[400px]">
              <div className="flex items-center ml-2">
                <span className="text-xs font-medium mr-2 leading-none">Name</span>
              </div>
              <InputBase
                value={nameValue}
                onChange={updatedValue => {
                  setNameValue(updatedValue);
                }}
                placeholder="Tony"
              />
              <div className="flex items-center ml-2">
                <span className="text-xs font-medium mr-2 leading-none">Description</span>
              </div>
              <InputBase
                value={descriptionValue}
                onChange={updatedValue => {
                  setDescriptionValue(updatedValue);
                }}
                placeholder="This is a long description."
              />

              <div className="flex items-center ml-2">
                <span className="text-xs font-medium mr-2 leading-none">Image URL</span>
              </div>
              <InputBase
                value={imageUrlValue}
                onChange={updatedValue => {
                  setImageUrlValue(updatedValue);
                }}
                placeholder="ipfs://Qm12eqwkjn12"
              />

              <button
                className="btn btn-primary"
                onClick={async () => {
                  await writeProfileAsync({
                    functionName: "setProfile2",
                    args: [nameValue, descriptionValue, imageUrlValue, isUsingProfileValue, isUsingEnsValue],
                  });
                  //   setProfileUpdated(true);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        <div className="bg-secondary rounded-xl p-1">
          <button
            className="btn btn-primary"
            onClick={async () => {
              if (onExitEditMode) onExitEditMode();
            }}
          >
            Exit Edit Mode
          </button>
        </div>
      </div>
    </div>
  );
};
