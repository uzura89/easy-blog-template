import { useState, useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className: string;
  placeholder: string;
}

export const TextareaExpandable: React.FC<Props> = (props) => {
  const [height, setHeight] = useState("auto");
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setHeight("auto");
    // setHeight(`${ref.current?.scrollHeight}px`);
    props.onChange(event.target.value);
  };

  useEffect(() => {
    setHeight("auto");
    setHeight(`${ref.current?.scrollHeight}px`);
  }, [props.value]);

  return (
    <textarea
      className={`form-input ${props.className} overflow-hidden`}
      ref={ref}
      style={{ height }}
      value={props.value}
      onChange={handleChange}
      placeholder={props.placeholder}
    />
  );
};
