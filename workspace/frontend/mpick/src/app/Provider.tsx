"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material";
import {NextUIProvider} from '@nextui-org/react'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <NextUIProvider>
            <CssBaseline />
              {children}
          </NextUIProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default Provider;
