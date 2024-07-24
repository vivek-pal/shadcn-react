import * as z from "zod";

export const NewQuoteSchema = z.object({
  effectiveDate: z.date({
    required_error: "A effective date is required.",
  }),
  product: z.enum(["AHH", "CarrierSpecialityAccidentHealth"], {
    invalid_type_error: "Select a product",
    required_error: "Please select a product.",
  }),
});

export const BussinessClassSchema = z.object({
  businessClassCode: z.string({
    message: "Please select a business class code.",
  }),
  bussinessClasss: z.array(
    z.object({
      subClassCode:z.enum(["Football", "NonSportsCampsDay"],{
        message: "Please select a sub classs code.",
        required_error: "Please select a sub classs code.",
      }),
      numberToParticipants: z
        .string()
        .min(2, {
          message: "Please enter a number to participants.",
          required_error: "Please enter a number to participants.",
        }),
    })
  ),
});

export const AccountSchema = z.object({
  name: z.string({
    message: "Please enter a name",
  }),
  address: z.string({
    message: "Please enter a address",
  }),
  city: z.string({
    message: "Please enter a city",
  }),
  state: z.string({
    message: "Please enter a state",
  }),

  zip: z.string().min(5, {
    message: "Zip must be at least 5 characters long",
    required_error: "Please enter a zip.",
  }),
  effectiveDate: z.date({
    required_error: "A expiration date is required.",
  }),
  expirationDate: z.date({
    required_error: "A expiration date is required.",
  }),
});
