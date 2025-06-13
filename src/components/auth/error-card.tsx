import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Ops, algo deu errado!"
      backButtonHref="auth/login"
      backButtonLabel="Tentar novamente"
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="w-16 h-16 text-destructive animate-pulse" />
      </div>
    </CardWrapper>
  );
};
