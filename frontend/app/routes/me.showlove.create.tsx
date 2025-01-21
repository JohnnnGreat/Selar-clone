import {
  ExternalLink,
  ExternalLinkIcon,
  Facebook,
  Instagram,
  Loader,
  Twitter,
} from "lucide-react";
import React from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import pkg from "react-color";
import { ClientOnly } from "remix-utils/client-only";
import Slider from "~/components/slider.client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import useShowloveStore from "~/actions/showlove";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";
import ApiRequest from "~/lib/axios";
import { useNavigate } from "@remix-run/react";
import AvatarImageComponent from "~/components/avatar.client";

const ShowLoveCreate = () => {
  return (
    <div className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto px-4 md:px-0">
      <StepOne />
      <StepTwo />
      <StepThree />
      <StepFour />
      <StepFive />
      <StepSix />
      <StepSeven />
    </div>
  );
};

export default ShowLoveCreate;

const StepOne = () => {
  const { setShowLove, showLove } = useShowloveStore((state) => state);

  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px]">
      <ClientOnly>
        {() => {
          return <AvatarImageComponent />;
        }}
      </ClientOnly>
      <div>
        <Label>Display Name *</Label>
        <Input
          placeholder="Enter Display Name"
          className="mt-2"
          onChange={(e) => {
            setShowLove({ displayName: e.target.value });
          }}
        />
      </div>
      <div className="mt-4">
        <Label>Your Bio</Label>
        <Textarea
          onChange={(e) => {
            setShowLove({ bio: e.target.value });
          }}
          placeholder="Tell us about yourself"
          className="mt-2"
        />
      </div>
    </div>
  );
};

const StepTwo = () => {
  const { setShowLove, showLove } = useShowloveStore((state) => state);

  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px] mt-8">
      <Header text="Show love link" pos={2} />

      <div className="border rounded-md flex flex-col md:flex-row items-center mt-8">
        <div className="flex items-center gap-1 text-gray-400 py-4 px-4 md:px-6 border-b md:border-b-0 md:border-r w-full md:w-auto">
          <ExternalLinkIcon className="w-4 flex-shrink-0" />
          <p className="text-[.8rem] md:text-[.9rem] truncate">
            https://localhost:5173/showlove
          </p>
        </div>
        <form className="w-full md:w-auto">
          <Input
            placeholder="johndoe"
            className="border-none focus:outline-none w-full md:w-[300px]"
            onChange={(e) => {
              setShowLove({ showLoveLink: e.target?.value });
            }}
          />
        </form>
      </div>
    </div>
  );
};

const StepThree = () => {
  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
      <Header text="Choose a theme color *" pos={3} />

      <div className="flex items-center mt-8">
        <ClientOnly fallback={<Loader className="w-6 h-6 animate-spin" />}>
          {() => {
            return <Slider />;
          }}
        </ClientOnly>
      </div>
    </div>
  );
};

const StepFour = () => {
  const { setShowLove } = useShowloveStore((state) => state);
  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
      <Header text="Show love page heading text *" pos={4} />

      <div className="border rounded-md flex items-center mt-8">
        <Input
          type="text"
          placeholder="Show Love Page Heading Text"
          onChange={(e) => {
            setShowLove({ heading: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

const StepFive = () => {
  const { setShowLove } = useShowloveStore((state) => state);
  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
      <Header text="Custom thank you note to fan" pos={5} />

      <div className="border rounded-md flex items-center mt-8">
        <Input
          type="text"
          placeholder="Set your thank you note"
          onChange={(e) => {
            setShowLove({ customNote: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

const socialMedia = [
  {
    title: "Facebook",
    icon: Facebook,
  },
  {
    title: "Instagram",
    icon: Instagram,
  },
  {
    title: "Twitter",
    icon: Twitter,
  },
];

export interface ISM {
  id: number;
  type: string;
  value: string;
}

const StepSix = () => {
  const { setShowLove } = useShowloveStore((state) => state);

  const [sm, setSm] = React.useState<Partial<ISM[] | any>>([
    {
      id: Date.now(),
      type: "",
      value: "",
    },
  ]);

  const handleValueChange = (type: string, id: number) => {
    const socialMedia = sm.map((item: ISM) =>
      item.id === id
        ? {
            ...item,
            type: type,
          }
        : item
    );
    setSm(socialMedia);
  };

  const handleAddSm = () => {
    setSm([...sm, { id: Date.now(), type: "", value: "" }]);
  };

  const handleInputChange = (value: string, id: number) => {
    const socialMedia = sm.map((item: ISM) =>
      item.id === id
        ? {
            ...item,
            value: value,
          }
        : item
    );

    setSm(socialMedia);
  };

  React.useEffect(() => {
    setShowLove({ socialMedia: sm });
  }, [sm]);

  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
      <Header text="Add social media link" pos={6} />
      {sm.map((item: ISM) => (
        <div
          key={item.id}
          className="border rounded-md flex flex-col md:flex-row items-center mt-8"
        >
          <Select
            onValueChange={(value) => {
              handleValueChange(value, item.id);
            }}
          >
            <SelectTrigger
              id="productType"
              className="w-full md:w-[200px] border-none"
            >
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {socialMedia.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <SelectItem key={idx} value={item.title}>
                    <div className="flex items-center gap-4 text-gray-500">
                      <Icon className="w-3 h-3" />
                      <p>{item.title}</p>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="border-t md:border-t-0 md:border-l w-full">
            <Input
              className="border-none"
              placeholder="@username"
              onChange={(e) => {
                handleInputChange(e.target.value, item.id);
              }}
            />
          </div>
        </div>
      ))}

      <Button className="mt-4 w-full" variant="outline" onClick={handleAddSm}>
        Add More
      </Button>
    </div>
  );
};

const StepSeven = () => {
  const [isConsent, setIsConsent] = React.useState(false);
  const { showLove } = useShowloveStore((state) => state);
  const [showLoveUrl, setShowLoveUrl] = React.useState("");
  const [creatingShowLove, setCreatingShowLove] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setCreatingShowLove(true);

    if (!showLove.displayName || !showLove.color || !showLove.heading) {
      toast.error("Make sure all required inputs are filled");
      setCreatingShowLove(false);
      return;
    }

    toast.warning(
      "Please be sure this profile you are creating DOES NOT IMPERSONATE another person or entity, else this profile will be deleted and all payments reversed.",
      {
        action: {
          label: "Understand",
          onClick: async () => {
            try {
              const { data } = await ApiRequest.post(
                "/showlove/create",
                showLove
              );
              toast.success(data?.message);
              const savedShowloveId = data?.savedShowLove._id;
              const url = `http://localhost:5173/showlove/${savedShowloveId}`;
              setShowLoveUrl(url);
              setShowDialog(true);
            } catch (error) {
              console.log(error);
              toast.error("An error has occurred while creating your showlove");
            } finally {
              setCreatingShowLove(false);
            }
          },
        },
      }
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(showLoveUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
        <Header text="Confirmation *" pos={7} />

        <div className="rounded-md flex items-start md:items-center mt-8 gap-4">
          <Input
            type="checkbox"
            className="w-4 mt-1 md:mt-0"
            onChange={(e) => {
              setIsConsent(e.target.checked);
            }}
          />
          <p className="text-sm md:text-base">
            I agree with our terms and conditions and privacy policy.
          </p>
        </div>

        {isConsent && (
          <Button
            onClick={handleSubmit}
            className="w-full mt-4"
            disabled={creatingShowLove}
          >
            {creatingShowLove ? "Creating..." : "Start Receiving Love"}
          </Button>
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Congratulations! Your page has been created.
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="text-center text-gray-500">
              <p>Share via:</p>
              <div className="mt-4 flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    window.open(
                      `https://www.instagram.com/share?url=${showLoveUrl}`,
                      "_blank"
                    );
                  }}
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2">
              <Label>View public page:</Label>
              <div className="flex items-center space-x-2">
                <Input value={showLoveUrl} readOnly className="flex-1" />
                <Button variant="outline" onClick={handleCopyLink}>
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex w-full gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowDialog(false);
                  navigate("/dashboard");
                }}
              >
                Go to Dashboard
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  window.open(showLoveUrl, "_blank");
                }}
              >
                View Page
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Header = ({ text, pos }: { text: string; pos: number }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-2 text-[.8rem]">
      <h1 className="font-medium">{text}</h1>
      <p className="text-gray-500">Step {pos} of 7</p>
    </div>
  );
};
