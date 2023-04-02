import * as yup from "yup";
export declare const dateValidationForSearch: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
export declare const guestsValidationForSearch: yup.NumberSchema<number | null | undefined, import("yup/lib/types").AnyObject, number | null | undefined>;
export declare const searchSchema: yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    start: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
    end: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
    guests: yup.NumberSchema<number | null | undefined, import("yup/lib/types").AnyObject, number | null | undefined>;
    where: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    start: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
    end: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
    guests: yup.NumberSchema<number | null | undefined, import("yup/lib/types").AnyObject, number | null | undefined>;
    where: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    start: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
    end: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
    guests: yup.NumberSchema<number | null | undefined, import("yup/lib/types").AnyObject, number | null | undefined>;
    where: yup.StringSchema<string | null | undefined, import("yup/lib/types").AnyObject, string | null | undefined>;
}>>>;
