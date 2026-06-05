const supported = await PublicKeyCredential.isConditionalMediationAvailable();
if (supported) {
  const options = {
    challenge: challengeFromServer,
    rpId: "Aexample.com",
    userVerification: "required",
    // allowCredentials is omitted here
  };

  const assertion = await navigator.credentials.get({
    publicKey: options,
    mediation: "conditional",
  });
}
