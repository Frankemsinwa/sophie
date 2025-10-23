import { cn } from "@/lib/utils";

export function PaymentIcons({ name, className }: { name: string, className?: string }) {
  switch (name) {
    case 'paypal':
      return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-6 w-6", className)}
        >
            <title>PayPal</title>
            <path
                d="M7.058 21.24c-2.36 0-4.435-1.12-5.71-3.272C.28 16.143 0 14.133 0 12.015 0 8.004 2.93 4.686 7.23 4.686c4.015 0 6.685 2.15 7.425 6.425.13 1.01-.76 1.133-1.42.12-.48-1.15-.9-1.92-2.12-1.92-1.28 0-2.31.84-2.43 2.62-.13 1.43.93 2.23 2.45 2.23h.33c1.16 0 2.03-.49 2.4-1.8.23-.84.44-1.63.7-2.43.25-.8 1.12-.93 1.55-.13.43.8.13 1.92-.23 3.14-.7 2.2-1.96 3.52-4.18 3.52zm14.312-8.52c0-2.38-1.55-3.35-3.6-3.35-2.36 0-3.62 1.2-4.23 2.92-.25.7-.01 1.55.63 1.55.78 0 1.18-.8 1.35-1.3.29-.86.93-1.5 1.94-1.5 1.1 0 1.68.56 1.68 1.53 0 1.01-.73 1.4-1.4 1.83l-1.42.93c-.56.33-.86.68-.86 1.25 0 .8.63 1.18 1.5 1.18 1.65 0 2.53-1.1 2.7-2.75.08-.66.6-1.1 1.26-1.1.6 0 1.05.46 1.05 1.04 0 2.4-1.8 3.7-4.2 3.7-2.52 0-3.9-1.1-3.9-3.15 0-1.5.9-2.3 2.1-2.9l1.4-.9c.6-.4.9-.7.9-1.2z"
                fill="currentColor"
            />
        </svg>
      );
    case 'bank':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("h-6 w-6", className)}
            >
                <path d="m3 9 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                <path d="M12 22V12" />
            </svg>
        );
    case 'crypto':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("h-6 w-6", className)}
            >
                <path d="M10.73 18.99a2.33 2.33 0 0 0 3.3-1.15l2.76-5.62a2.33 2.33 0 0 0-1.15-3.3l-5.62-2.76a2.33 2.33 0 0 0-3.3 1.15L3.96 13.93a2.33 2.33 0 0 0 1.15 3.3l5.62 2.76Z"/>
                <path d="M12 22v-2"/>
            </svg>
        );
    default:
      return null;
  }
}
