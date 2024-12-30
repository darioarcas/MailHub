/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";


/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (prop) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand px-3" href="/">
          {isAuthenticated ? "Bandeja de Entrada" : "MailHub Microsoft"}
        </a>

        <div className="collapse navbar-collapse justify-content-end px-3">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Navbar>
      <>
        <center>
          {!isAuthenticated && <h3 className="py-5">Bienvenido!</h3> }
        </center>
      </>
      <center>
        {/* {MainContent()} */}
        {prop.children}
      </center>
    </>
  );
};