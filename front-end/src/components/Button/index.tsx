interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const Button = (Props: ButtonProps) => {
    const { label, onClick } = Props;

    return <button onClick={onClick}>{label}</button>;
};
