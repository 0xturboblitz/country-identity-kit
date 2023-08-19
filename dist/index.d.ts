import * as react_jsx_runtime from 'react/jsx-runtime';
import { BigIntArgument, PCD, SerializedPCD } from '@pcd/pcd-types';
import { ReactNode } from 'react';

/**
 * LogInWithCountryIdentity is a React component that provides a user interface
 * for logging in and logging out using the CountryIdentityContext. It renders a
 * button that triggers a login modal when clicked, and provides methods to
 * initiate user login using the anon aadhaar zk circuit. The component utilizes
 * the authentication state and login request function from the context.
 *
 * @returns A JSX element representing the LogInWithCountryIdentity component.
 */
declare const LogInWithCountryIdentity: () => react_jsx_runtime.JSX.Element;

type BigNumberish = string | bigint;
/**
 * @dev claim this public key signed a message
 */
interface IdentityPCDClaim {
    modulus: BigNumberish;
}
/**
 * @dev proof of claim correct
 */
interface IdentityPCDProof {
    modulus: BigNumberish;
    proof: SnarkJSProof;
}
/**
 * @dev witness use for create zk proof of IdentityPCD package.
 */
interface IdentityPCDArgs {
    base_message: BigIntArgument;
    signature: BigIntArgument;
    modulus: BigIntArgument;
}
type SnarkJSProof = {
    pi_a: BigNumberish[];
    pi_b: BigNumberish[][];
    pi_c: BigNumberish[];
    protocol: string;
    curve: string;
};

declare class IdentityPCD implements PCD<IdentityPCDClaim, IdentityPCDProof> {
    type: string;
    claim: IdentityPCDClaim;
    proof: IdentityPCDProof;
    id: string;
    constructor(id: string, claim: IdentityPCDClaim, proof: IdentityPCDProof);
}

/**
 * useCountryIdentity is a custom React hook that provides access to the authentication
 * state and the login request function from the CountryIdentityContext. This hook
 * is intended to be used within components that are descendants of the
 * CountryIdentityProvider.
 *
 * @returns An array containing:
 *   - The authentication state (CountryIdentityState) obtained from the context.
 *   - The login request function (startReq) obtained from the context.
 */
declare function useCountryIdentity(): [
    CountryIdentityState,
    (request: CountryIdentityRequest) => void
];
type CountryIdentityRequest = {
    type: 'login';
    args: IdentityPCDArgs;
} | {
    type: 'logout';
};
type CountryIdentityState = {
    /** Whether the user is logged in. @see ProveButton */
    status: 'logged-out' | 'logged-in' | 'logging-in';
} & ({
    status: 'logged-out';
} | {
    status: 'logging-in';
} | {
    status: 'logged-in';
    serializedPCD: SerializedPCD<IdentityPCD>;
    pcd: IdentityPCD;
});

/**
 * CountryIdentityProvider is a React component that serves as a provider for the
 * CountryIdentityContext. It manages the authentication state, login requests,
 * and communication with the proving component. This provider initializes the
 * authentication state from local storage on page load and handles updates to
 * the state when login requests are made and when new proofs are received.
 *
 * @param props - Props for the CountryIdentityProvider component.
 *   - children: The child components that will have access to the provided context.
 *
 * @returns A JSX element that wraps the provided child components with the
 * CountryIdentityContext.Provider.
 */
declare function CountryIdentityProvider(props: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;

declare const Proof: ({ code, label }: {
    code: string;
    label?: string | undefined;
}) => react_jsx_runtime.JSX.Element;

export { CountryIdentityProvider, LogInWithCountryIdentity, Proof, useCountryIdentity };
