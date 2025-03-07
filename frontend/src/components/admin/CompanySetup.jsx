import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import getCompaniesById from "../hooks/getCompaniesById";

const CompanySetup = () => {
  const params = useParams();
  const companyId =params.id
  getCompaniesById(companyId)
  const [input, setinput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singalCompany } = useSelector((store) => store.company);
  const [loading, setloading] = useState(false);
  const [PhotoUpdate, setPhotoUpdate] = useState("")
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files[0] });
  };
  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];
  
    const reader = new FileReader();
  
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setinput({ ...input, file: e.target.files[0] });
        }
      };
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // companyName,location,description,website
    formData.append("companyName", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setloading(true);
      const { data } = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setinput(
      {
        name:singalCompany.companyName || "",
        description:singalCompany.description || "",
        website: singalCompany.website || "",
        location:singalCompany.location || "",
        file: singalCompany.logo || null,
      }
    )
  }, [singalCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 ">
        <form onSubmit={submitHandler}>
          <div className="flex gap-5 p-8 items-center">
            <Button onClick={()=>navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 font-semibold text-gray-500"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-2 ">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name={"name"}
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name={"description"}
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name={"website"}
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name={"location"}
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeImageHandler}
              />
            </div>
            <div className="flex items-center  mt-5 ">
              {
                  PhotoUpdate && <div>
                    <img src={PhotoUpdate} alt="New Logo" className="w-[2rem] h-[2rem] rounded-full"/>
                  </div>
              }
            </div>
          </div>
          {
            loading? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait </Button>:<Button type="submit" className="w-full my-4">
            Update
          </Button>
          }
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
