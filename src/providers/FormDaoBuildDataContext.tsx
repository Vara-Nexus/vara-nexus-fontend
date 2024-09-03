import React, { createContext, useState, useContext } from 'react';

const FormDataContext = createContext({});

export const useFormData = () => {
  return useContext(FormDataContext);
};

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState({});

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
