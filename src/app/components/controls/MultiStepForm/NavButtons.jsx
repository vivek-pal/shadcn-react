import { setCurrentStep } from "../../../redux/slices/mainSlice";
import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

export default function NavButtons() {
  const currentStep = useSelector((store) => store.account?.currentStep);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStep - 1));
  }

  const handleExit = () => {
    dispatch(setCurrentStep(1));
    navigate("/");
  }

  return (
    <div className="flex justify-between items-center">
      {currentStep === 1 && (
        <Button
          style={{ visibility: "hidden" }}
        >
          Start
        </Button>
      )}
      {currentStep > 1 && (
        <Button onClick={handlePrevious} className="inline-flex items-center">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Back</span>
        </Button>
      )}
      {currentStep < 3 ? (
        <Button type="submit">
          <span>Next</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      ) : (
        <Button  onClick={handleExit} variant="destructive">
          <span>Exit</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
}
