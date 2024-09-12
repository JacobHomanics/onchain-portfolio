"use client";

import "react";
// import { useTheme } from "next-themes";
import {
  // PublicClient, //Chain,
  // createPublicClient,
  // http,
  isAddress,
  zeroAddress,
} from "viem";
import { foundry, sepolia } from "viem/chains";
// import * as chains from "viem/chains";
// import { Chain } from "viem/chains";
import { normalize } from "viem/ens";
// import { useEffect } from "react";
import {
  useAccount, //useAccount,
  useEnsAddress, // useEnsAvatar, // useEnsName,
  // useEnsText, // usePublicClient
} from "wagmi";
// import { getPublicClient } from "wagmi/actions";
// import { GrowCard } from "~~/components/onchain-portfolio/GrowCard";
// import { InactiveSubscriptionCard } from "~~/components/onchain-portfolio/InactiveSubscriptionCard";
// import { NotSupportedNetworkCard } from "~~/components/onchain-portfolio/NotSupportedNetworkCard";
// import { NoticeCard } from "~~/components/onchain-portfolio/NoticeCard";
// import { Profile } from "~~/components/onchain-portfolio/Profile";
// import { UnknownNetworkCard } from "~~/components/onchain-portfolio/UnknownNetworkCard";
// import { Address } from "~~/components/scaffold-eth";
// import { dummyUser } from "~~/components/onchain-portfolio/test-data/dummyUser";
// import { useComplexIsProfileSubscriptionActive } from "~~/hooks/onchain-portfolio/useComplexIsProfileSubscriptionActive";
// import { useProfileAddress } from "~~/hooks/onchain-portfolio/useProfileAddress";
import "~~/hooks/scaffold-eth";
import { getChainWithAttributes } from "~~/utils/onchain-portfolio/scaffoldEth";
import { getChainByName } from "~~/utils/onchain-portfolio/viemHelpers";

// import { wagmiConfig } from "~~/services/web3/wagmiConfig";
// import insertSpaces from "~~/utils/onchain-portfolio/textManipulation";

// const ensSpoofChain = { ...sepolia, ...NETWORKS_EXTRA_DATA[sepolia.id] };
const ensSpoofChain = getChainWithAttributes(sepolia);

export default function UserPage({ params }: { params: { chain: string; account: string } }) {
  // const spoofedNetworkColor = useNetworkColor(spoofChain);

  const paramsChain = getChainByName(params.chain);

  const isFoundry = paramsChain?.id === foundry.id;

  const selectedEnsChain = isFoundry ? ensSpoofChain : paramsChain;
  const { data: resolvedEnsAddress } = useEnsAddress({
    name: normalize(params.account),
    chainId: selectedEnsChain?.id,
  });

  const account = useAccount();

  let authenticAddress;

  if (resolvedEnsAddress === undefined) {
    console.log("Possibly loading");

    if (paramsChain === undefined) {
      console.log("Not a real network");
    }
  }

  if (resolvedEnsAddress === null) {
    if (isAddress(params.account)) {
      authenticAddress = params.account;
      console.log("Valid netwotk with an address that is not registered with ENS.");
    } else {
      console.log("Valid network with invalid ens name");
    }
  }

  if (resolvedEnsAddress) {
    if (isFoundry) {
      console.log("Is spoofing ens for foundry with ens name in url.");
      authenticAddress = account?.address ?? zeroAddress;
    } else {
      console.log("Valid network with a valid ens name in url.");
      authenticAddress = resolvedEnsAddress;
    }
  }

  console.log(authenticAddress);
  // const { data: ensNickname } = useEnsText({
  //   name: normalize(params.account),
  //   chainId: selectedEnsChain?.id,
  //   key: "name",
  // });

  // const { data: ensDescription } = useEnsText({
  //   name: normalize(params.account),
  //   chainId: selectedEnsChain?.id,
  //   key: "description",
  // });

  // const { data: ensAvatar } = useEnsAvatar({
  //   name: normalize(params.account),
  //   chainId: selectedEnsChain?.id,
  // });

  // console.log(ensNickname);
  // console.log(ensDescription);
  // console.log(ensAvatar);

  // const [ensAddress, setEnsAddress] = useState<string>();
  // // console.log(ensAddress);

  // useEffect(() => {
  //   async function get() {
  //     if (ensPublicClient === undefined) return;

  //     if (isAddress(params.observedAccount)) {
  //       setEnsAddress(params.observedAccount);
  //     } else {
  //       const resolvedAddr = await ensPublicClient.getEnsAddress({
  //         name: normalize(params.observedAccount),
  //       });

  //       //if site user wallet is not connected
  //       if (account?.address === undefined) {
  //         if (resolvedAddr !== null) setEnsAddress(resolvedAddr);
  //       }
  //     }
  //   }
  //   get();
  // }, [ensPublicClient?.chain?.id, params.observedAccount]);

  // const [authenticAddress, setAuthenticAddress] = useState<string>();

  // useEffect(() => {
  //   async function get() {
  //     //if page observed account IS an address
  //     if (isAddress(params.observedAccount)) {
  //       //then set finalized observed account
  //       setAuthenticAddress(params.observedAccount);
  //     }
  //     //else page observed account IS NOT an address
  //     else {
  //       //if page chain IS foundry
  //       if (paramsChainWithAttributes?.id === foundry.id) {
  //         //THEN spoof sepolia ens profile
  //         const publicClient = createPublicClient({
  //           chain: spoofChain,
  //           transport: http(getAlchemyHttpUrl(spoofChain.id)),
  //         });

  //         const resolvedAddr = await publicClient.getEnsAddress({
  //           name: normalize(params.observedAccount),
  //         });

  //         //if site user wallet is not connected
  //         if (account?.address === undefined) {
  //           if (resolvedAddr !== null) setAuthenticAddress(resolvedAddr);
  //         }
  //       }
  //     }
  //   }
  //   get();
  // }, [account?.address, paramsChainWithAttributes?.id]);

  // useEffect(() => {
  //   async function get() {
  //     if (paramsChainWithAttributes?.id === foundry.id) {
  //       const publicClient = createPublicClient({
  //         chain: spoofChain,
  //         transport: http(getAlchemyHttpUrl(spoofChain.id)),
  //       });

  //       const nickname = await publicClient.getEnsText({ name: normalize(params.observedAccount), key: "name" });
  //       const description = await publicClient.getEnsText({
  //         name: normalize(params.observedAccount),
  //         key: "description",
  //       });
  //       const image = await publicClient.getEnsAvatar({ name: normalize(params.observedAccount) });
  //     }
  //   }
  //   get();
  // }, [params.observedAccount, paramsChainWithAttributes?.id]);

  return <></>;
  // const networkColor = useNetworkColor(paramsChainWithAttributes);

  // return (
  //   <div className="flex flex-col flex-grow bg-primary">
  //     <p>
  //       This page is loading data from the{" "}
  //       <span style={{ color: networkColor }}>{paramsChainWithAttributes?.name}</span> network.
  //     </p>
  //     <p>
  //       This page is spoofing some data from the <span style={{ color: spoofedNetworkColor }}>{spoofChain.name}</span>{" "}
  //       network.
  //     </p>
  //     <Address address={authenticAddress} chain={spoofChain} />
  //   </div>
  // );

  // useEffect(() => {
  //   async function get() {
  //     if (retrievedChainFromUrl === undefined) return;

  //     if (isAddress(params.user)) {
  //       setSomeAddress(params.user);
  //     } else {
  //       const publicClient = createPublicClient({
  //         chain: retrievedChainFromUrl?.id === 31337 ? sepolia : retrievedChainFromUrl,
  //         transport: http(
  //           getAlchemyHttpUrl(retrievedChainFromUrl?.id === 31337 ? sepolia.id : retrievedChainFromUrl.id),
  //         ),
  //       });

  //       const resolvedAddr = await publicClient.getEnsAddress({
  //         name: normalize(params.user),
  //       });

  //       setSomeAddress(resolvedAddr);
  //     }
  //   }
  //   get();
  // }, [retrievedChainFromUrl?.id, params.user]);

  // useEffect(() => {
  //   async function get() {
  //     if (retrievedChainFromUrl === undefined) return;

  //     if (!isAddress(params.user)) {
  //       const publicClient = createPublicClient({
  //         chain: retrievedChainFromUrl,
  //         transport: http(getAlchemyHttpUrl(retrievedChainFromUrl?.id)),
  //       });

  //       const addr = await publicClient.getEnsAddress({
  //         name: normalize(params.user),
  //       });

  //       setReturnedAddress(addr as string);
  //     }
  //   }
  //   get();
  // }, [retrievedChainFromUrl?.id]);

  // const { profileAddress, isLoadingProfileAddress, selectedNetwork } = useProfileAddress(params.user, retrievedChain);

  // console.log(selectedNetwork);

  // const { data: profileData, refetch: refetchProfileData } = useScaffoldReadContract({
  //   contractName: "Profile",
  //   functionName: "getProfile",
  //   args: [profileAddress],
  // });

  // const [isLoadingEns, setIsLoadingEns] = useState(false);
  // const [nickname, setNickname] = useState<string | null>();
  // const [description, setDescription] = useState<string | null>();
  // const [image, setImage] = useState<string | null>();
  // const [isUsingProfile, setIsUsingProfile] = useState(false);
  // const [isUsingEns, setIsUsingEns] = useState(false);

  // useEffect(() => {
  //   async function get() {
  //     if (!isValidEns || !profileData || profileData?.[3]) return;

  //     setIsLoadingEns(true);

  //     const publicClient = createPublicClient({
  //       chain: targetNetwork,
  //       transport: http(getAlchemyHttpUrl(targetNetwork.id)),
  //     });

  //     const nickname = await publicClient.getEnsText({ name: normalize(params.user), key: "name" });
  //     const description = await publicClient.getEnsText({ name: normalize(params.user), key: "description" });
  //     const image = await publicClient.getEnsAvatar({ name: normalize(params.user) });

  //     console.log(profileData?.[3]);
  //     setNickname(nickname);
  //     setDescription(description);
  //     setImage(image);
  //     setIsLoadingEns(false);
  //   }
  //   get();
  // }, [isValidEns, profileData, profileData?.[3]]);
  // const { targetNetwork } = useTargetNetwork();

  // useEffect(() => {
  //   async function get() {
  //     if (profileData?.[3] === undefined) return;
  //     if (profileData?.[4] === undefined) return;

  //     if (profileData?.[3]) {
  //       setNickname(profileData?.[0]);
  //       setDescription(profileData?.[1]);
  //       setImage(profileData?.[2]);
  //       setIsUsingProfile(profileData?.[3]);
  //       setIsUsingEns(profileData?.[4]);
  //     } else {
  //       setIsLoadingEns(true);

  //       let selectedNetwork = targetNetwork.id === 31337 ? sepolia : targetNetwork;

  //       const publicClient = createPublicClient({
  //         chain: selectedNetwork,
  //         transport: http(getAlchemyHttpUrl(selectedNetwork.id)),
  //       });

  //       const nickname = await publicClient.getEnsText({ name: normalize(params.user), key: "name" });
  //       // const description = await publicClient.getEnsText({ name: normalize(params.user), key: "description" });
  //       // const image = await publicClient.getEnsAvatar({ name: normalize(params.user) });
  //       setNickname(nickname);
  //       // setDescription(description);
  //       // setImage(image);
  //       // setIsUsingEns(profileData?.[4]);
  //       setIsLoadingEns(false);
  //     }
  //   }
  //   get();
  // }, [
  //   params.user,
  //   profileData,
  //   targetNetwork,
  //   targetNetwork?.id,
  //   profileData?.[0],
  //   profileData?.[1],
  //   profileData?.[2],
  //   profileData?.[3],
  // ]);

  // const formattedNetwork = insertSpaces(params.network).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  // const { retrievedChain, isLoading: isLoadingRetrievedChain } = useGetChainByValue(params.network);

  // const { data: paymentVerifier, isLoading: isLoadingPaymentVerifier } = useScaffoldContract({
  //   contractName: "PaymentVerifier",
  //   chain: retrievedChain,
  // });

  // const { isProfileSubscriptionActive, isLoadingIsProfileSubscriptionActive, refetch } =
  //   useComplexIsProfileSubscriptionActive(retrievedChain, profileAddress);

  // // const { writeContractAsync: writeProfileAsync } = useScaffoldWriteContract("Profile");

  // async function refresh() {
  //   await refetch();
  //   await refetchProfileData();
  // }

  // let justify: "start" | "center" = "start";
  // let output;

  // const isLoading =
  //   isLoadingPaymentVerifier ||
  //   isLoadingRetrievedChain ||
  //   isLoadingIsProfileSubscriptionActive ||
  //   isLoadingProfileAddress ||
  //   isLoadingEns;

  // if (isLoading) {
  //   justify = "center";
  //   output = (
  //     <>
  //       <p className="text-center text-4xl">{"Spinning up the hamsters."}</p>
  //       <p className="text-center text-4xl">{"Tricking the hamsters with more cheese."}</p>
  //       <p className="text-center text-4xl">{"Buying more hamsters."}</p>
  //     </>
  //   );
  // } else {
  //   if (retrievedChain === undefined) {
  //     output = (
  //       <NoticeCard>
  //         <UnknownNetworkCard chainName={params.network} />
  //       </NoticeCard>
  //     );
  //   } else if (paymentVerifier?.address === undefined) {
  //     output = (
  //       <NoticeCard>
  //         <NotSupportedNetworkCard chain={retrievedChain} formattedNetwork={formattedNetwork} />
  //       </NoticeCard>
  //     );
  //   } else if (!isProfileSubscriptionActive) {
  //     output = (
  //       <NoticeCard>
  //         <InactiveSubscriptionCard
  //           connectedAddress={account?.address || ""}
  //           profileAddress={profileAddress}
  //           network={retrievedChain}
  //           onClick={refresh}
  //         />
  //       </NoticeCard>
  //     );
  //   }

  // if (output) {
  //   justify = "center";
  // }

  // if (!output) {
  //   // async function setProfileIsNotUsingEns(value: boolean) {
  //   //   // await writeProfileAsync({
  //   //   //   functionName: "setProfile",
  //   //   //   args: [profileData?.[0], profileData?.[1], profileData?.[2], value],
  //   //   // });
  //   // }
  //   // output = (
  //   //   <Profile
  //   //     address={profileAddress}
  //   //     name={nickname}
  //   //     description={description}
  //   //     image={image}
  //   //     isUsingProfile={isUsingProfile}
  //   //     isUsingEns={isUsingEns}
  //   //     // onCheckChange={setProfileIsNotUsingEns}
  //   //     refetch={refresh}
  //   //   />
  //   // );
  // }
  // }

  console.log("render check");
  return <></>;
  // return <GrowCard justify={justify}>{output}</GrowCard>;
}
