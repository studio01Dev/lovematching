'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createTestImageFiles, getTestDataForPage } from '@/domain/fixtures/testFormFixtures';

const FormTestContext = createContext(null);

export function FormTestProvider({ children }) {
  const formApiRef = useRef(null);
  const [remountKey, setRemountKey] = useState(0);
  const [devUserData, setDevUserData] = useState(null);

  const registerFormApi = useCallback((api) => {
    formApiRef.current = api;
    setDevUserData(api?.getUserData?.() ?? null);
  }, []);

  const syncUserData = useCallback((userData) => {
    setDevUserData(userData);
  }, []);

  const fillCurrentPage = useCallback(async () => {
    const api = formApiRef.current;
    if (!api) {
      return;
    }

    const form = api.getForm();
    let pageData = getTestDataForPage(form);

    if (form === 4) {
      pageData = {
        ...pageData,
        ...(await createTestImageFiles()),
      };
    }

    const nextUserData = {
      ...api.getUserData(),
      ...pageData,
    };

    api.setUserData(nextUserData);
    setDevUserData(nextUserData);
    setRemountKey((key) => key + 1);
  }, []);

  const value = useMemo(
    () => ({ registerFormApi, syncUserData, fillCurrentPage, remountKey, devUserData }),
    [registerFormApi, syncUserData, fillCurrentPage, remountKey, devUserData]
  );

  return (
    <FormTestContext.Provider value={value}>
      {children}
    </FormTestContext.Provider>
  );
}

export function useFormTest() {
  return useContext(FormTestContext);
}
