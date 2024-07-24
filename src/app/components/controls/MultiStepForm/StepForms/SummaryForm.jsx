import CardWrapper from "../../CardWrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
// import { SummaryFormSchema } from "../../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Input } from "../../../ui/input";
import { Button, buttonVariants } from "../../../ui/button";
import { z } from "zod";
import { Calendar } from "../../../ui/calendar";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../ui/command";
import { cn } from "../../../../../lib/utils";
import { format } from "date-fns";
// import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import NavButtons from "../NavButtons";
import {
  setCurrentStep,
  updateFormData,
  getSummary
} from "../../../../redux/slices/mainSlice";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const SummaryForm = () => {
  const currentStep = useSelector((store) => store.account.currentStep);
  const formData = useSelector((store) => store.account.formData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    // resolver: zodResolver(SummaryFormSchema),
    values: {
      ...formData,
    },
  });

  useEffect(() => {
    dispatch(getSummary());
  },[])


  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    dispatch(updateFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };
  const pending = false;
  //   const { pending } = useFormStatus();
  return (
    <CardWrapper
      //   label="Login to your account"
      //   title="Login"
      //   backButtonHref="/auth/register"
      //   backButtonLabel="Don't have an account? Register here."
      className=""
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limit</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deductible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deductible</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverageFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coverage Factor</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="premium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="premium1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="written"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Written</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="change"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : "Login"}
          </Button> */}
          <NavButtons />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SummaryForm;
