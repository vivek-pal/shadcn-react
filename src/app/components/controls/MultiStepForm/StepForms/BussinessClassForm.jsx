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
import { BussinessClassSchema } from "../../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useState } from "react";
import NavButtons from "../NavButtons";
import {
  setCurrentStep,
  updateFormData,
} from "../../../../redux/slices/mainSlice";

const languages = [
  { label: "Campers", value: "campers" },
  { label: "French", value: "fr" },
];

const BussinessClassForm = () => {
  const currentStep = useSelector((store) => store.account.currentStep);
  const formData = useSelector((store) => store.account.formData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(BussinessClassSchema),
    defaultValues: {
      ...formData,
      
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "bussinessClasss",
    control: form.control,
  });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    dispatch(updateFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };
  
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
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="businessClassCode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Business Class Code</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[300px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "Select business class code"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search business class code..." />
                        <CommandEmpty>
                          No business class code found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue(
                                    "businessClassCode",
                                    language.value
                                  );
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
                    This is the business class code that will be used in the
                    classes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            {fields.map((field, index) => (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3" key={field.id}>
                <FormField
                  control={form.control}
                  name={`bussinessClasss.${index}.subClassCode`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Sub Class Code</FormLabel>
                      <div className="relative w-max">
                        <FormControl>
                          <select
                            className={cn(
                              buttonVariants({ variant: "outline" }),
                              "w-[300px] appearance-none font-normal"
                            )}
                            {...field}
                          >
                            <option value={""}>Please select</option>
                            <option value="Football">Football</option>
                            <option value="NonSportsCampsDay">
                              Non Sports Camps - Day
                            </option>
                          </select>
                        </FormControl>
                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                      </div>
                      {/* <FormDescription>
                    Set the sub Class Code.
                  </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`bussinessClasss.${index}.numberToParticipants`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Number to Participants
                      </FormLabel>
                      {/* <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add links to your website, blog, or social media
                        profiles.
                      </FormDescription> */}
                      <div className="flex items-end">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="mt-2 ml-6"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="flex items-end pl-6">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-2 "
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
                </div> */}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add
            </Button>
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

export default BussinessClassForm;
