interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  disabled,
  ...props
}) => (
  <button
    className="bg-transparent border-thin text-black mx-auto w-40 px-10 py-2 text-sm rounded-sm shadow-lg"
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
