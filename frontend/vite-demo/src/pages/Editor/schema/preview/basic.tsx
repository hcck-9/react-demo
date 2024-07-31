export interface Option {
  value: string;
  label: string;
}

const previewFields = {
  div: (props: any) => <div {...props} />,
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h1: (props: any) => <h1 {...props} />,
  p: (props: any) => <p {...props} />,
  span: (props: any) => <span>{props.children}</span>,
  Link: (props: any) => <a {...props} />,
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: any) => <img {...props} alt="" />,
  input: (props: any) => <input {...props} />,
  select: ({ children, ...other }: { children: Option[] }) => (
    <select {...other}>
      {children.map((option) =>
        option.value && option.label ? (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ) : null
      )}
    </select>
  ),
  button: (props: any) => <button {...props} />,
};

export default previewFields;
