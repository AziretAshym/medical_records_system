import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ name, label, onGetFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
    onGetFile(e);
  };

  const activateInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        name={name}
        ref={inputRef}
        onChange={onFileChange}
        className="hidden"
      />
      <Input
        type="text"
        value={fileName}
        placeholder={label}
        onClick={activateInput}
        readOnly
        className="cursor-pointer"
      />
      <Button type="button" onClick={activateInput}>
        Browse
      </Button>
    </div>
  );
};

export default FileInput;
