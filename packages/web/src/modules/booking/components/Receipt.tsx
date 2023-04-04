import { Box, Divider, Stack, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";

import { getDayDifference } from "../../../utils/getDayDifference";

export const Receipt = ({ price }: { price: number }) => {
  const calculateCosts = (start: string, end: string, price: number) => {
    const subTotal = getDayDifference(start, end) * price;
    const serviceFee = Math.round(subTotal * 0.1);
    const taxes = Math.round(subTotal * 0.15);
    const total = subTotal + serviceFee + taxes;

    return [
      {
        label: `$${price} USD x ${getDayDifference(start, end)} nights`,
        cost: subTotal,
      },
      { label: "Service fee", cost: serviceFee },
      { label: "Taxes", cost: taxes },
      { label: "Total", cost: total },
    ];
  };
  return (
    <Field>
      {({ form: { values } }: FieldProps) =>
        values.start &&
        values.end && (
          <Stack spacing={1} mt={2}>
            {calculateCosts(values.start, values.end, price).map(
              ({ label, cost }, index, array) => {
                const isTotal = array.length - 1 === index;
                return (
                  <React.Fragment key={index}>
                    {isTotal && <Divider />}
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontWeight: isTotal ? 400 : 100 }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontWeight: isTotal ? 400 : 100 }}>
                        ${cost} USD
                      </Typography>
                    </Stack>
                  </React.Fragment>
                );
              }
            )}
          </Stack>
        )
      }
    </Field>
  );
};
