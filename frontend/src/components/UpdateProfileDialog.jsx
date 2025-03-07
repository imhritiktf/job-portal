import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { data } from "autoprefixer";
import { Avatar, AvatarImage } from "./ui/avatar";

const UpdateProfileDialog = ({ Open, setOpen }) => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setinput] = useState({
    name: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.bio,
    skills: user?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const { name, email, phoneNumber, bio, skills, file } = input;

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // fullName, email, phoneNumber, bio, skills;
    formData.append("fullName", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("bio", bio);
    formData.append("skills", skills);
    if (file) {
      formData.append("file", file);
    }


    console.log(input)
    try {
      setloading(true);
      const { data } = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={Open}>
        <DialogContent
          className="sm:w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-center">
            <Input
              type="file"
              id="profilePhotoInput"
              style={{ display: "none" }}
              onChange={(e) => {
                // Handle file selection here
                const file = e.target.files[0];
                // You can upload the file to your server or perform any other action
              }}
            />

            <Avatar
              className="h-24 w-24"
              onClick={() => {
                document.getElementById("profilePhotoInput").click();
              }}
            >
              <AvatarImage src={user?.profile.profilePhoto} alt="profile" />
            </Avatar>
          </div>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Number</Label>
                <Input
                  id="number"
                  name="number"
                  type="text"
                  value={phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  value={bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Resume</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={changeFileHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
