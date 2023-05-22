export default function Button(props: {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  colorSecondary?: boolean;
  colorDanger?: boolean;
}) {
  return (
    <button
      onClick={props.onClick}
      className={`bg-link text-sm hover:opacity-90 active:opacity-80 text-white font-semibold py-2 px-4 rounded ${
        props.loading && "bg-buttonBgDisabled text-gray-500 cursor-not-allowed"
      } ${props.colorSecondary && "bg-gray-700"} ${
        props.colorDanger && "bg-pink-700"
      } ${props.disabled && "opacity-90"} ${props.fullWidth && "w-full"}`}
    >
      {!props.loading ? props.children : props.loadingText || props.children}
    </button>
  );
}
