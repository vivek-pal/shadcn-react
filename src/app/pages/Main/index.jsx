import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Header from "../../components/ui/header";

import NavButtons from "../../components/controls/MultiStepForm/NavButtons";
import AccountForm from "../../components/controls/MultiStepForm/StepForms/AccountForm";
import BussinessClassForm from "../../components/controls/MultiStepForm/StepForms/BussinessClassForm";
import Cards from "../../components/controls/Cards";
import { useEffect } from "react";
import SummaryForm from "../../components/controls/MultiStepForm/StepForms/SummaryForm";

const Main = () => {
  const currentStep = useSelector((store) => store.account?.currentStep);
  const currentStepS = currentStep.toString();
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.state == null) {
      navigate("/");
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <section className="w-full mx-auto max-w-screen-xl">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Cards />
          <Tabs value={currentStepS} className="space-y-4">
            <TabsList>
              <TabsTrigger value="1">Account</TabsTrigger>
              {/* <TabsTrigger value="2">Policy Info</TabsTrigger> */}
              <TabsTrigger value="2">Eligibility</TabsTrigger>
              <TabsTrigger value="3">Coverage Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="1" className="space-y-4">
              <div className="flex items-center justify-between">
                <AccountForm />
              </div>
            </TabsContent>
            <TabsContent value="2" className="space-y-4">
              <div className="flex items-center justify-between">
                <BussinessClassForm />
              </div>
            </TabsContent>
            <TabsContent value="3" className="space-y-4">
              <div className="flex items-center justify-between">
                <SummaryForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};
export default Main;
