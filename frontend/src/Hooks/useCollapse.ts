import { useState } from 'react';

export default function useCollapse() {
  const [collapse, setCollapse] = useState(false);
  const visible = collapse ? 'hidden' : '';

  const onSetCollapse = () => setCollapse(!collapse);

  return { visible, onSetCollapse };
}
