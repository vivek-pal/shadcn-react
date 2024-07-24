import CardWrapper from "./CardWrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { NewQuoteSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { z } from "zod";
import { Calendar } from "../ui/calendar";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "../../../lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { Toaster as ToasterProvider } from "../ui/toaster";
import { ToastAction } from "../ui/toast";
import { addNew } from "../../redux/slices/mainSlice";

const LoginForm = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(NewQuoteSchema),
    defaultValues: {
      effectiveDate: "",
      product: "",
    },
  });

  const routeChange = (data) => {
    let path = `/main`;
    navigate(path, {
      state: {
        id: id,
        effectiveDate: data.effectiveDate,
        product: data.product,
      },
    });
  };

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    console.log("id: ", id)
    
    if (id == undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Id is missing in the Url.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      if (data.product === "AHH") {
        dispatch(addNew(data));
        routeChange(data);
      } else {
        window.open("https://www.google.com/", "_self");
      }
    }
  };
  const pending = false;
  //   const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Enter your quote information"
      title="New Quote"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
      className={"md:w-1/2 "}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Effective Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your effective date calculate for quote.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("language", language.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <div className="relative w-max">
                    <FormControl>
                      <select
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "appearance-none font-normal"
                        )}
                        {...field}
                      >
                        <option value="">Please select</option>
                        <option value="AHH">AHH</option>
                        <option value="CarrierSpecialityAccidentHealth">
                          Carrier Speciality Accident Health
                        </option>
                      </select>
                    </FormControl>
                    <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                  <FormDescription>Select a product from list.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {"Start"}
          </Button>
        </form>
      </Form>
      <ToasterProvider />
    </CardWrapper>
  );
};

export default LoginForm;
