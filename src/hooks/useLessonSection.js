import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useLessonSection(sections) {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSectionIndex = () => {
    const sectionId = searchParams.get('section');

    if (!sectionId) {
      return 0;
    }

    const matchingIndex = sections.findIndex((section) => section.id === sectionId);
    return matchingIndex >= 0 ? matchingIndex : 0;
  };

  const [currentSection, setCurrentSectionState] = useState(getSectionIndex);

  useEffect(() => {
    setCurrentSectionState(getSectionIndex());
  }, [searchParams, sections]);

  const setCurrentSection = (nextSectionIndex) => {
    setCurrentSectionState(nextSectionIndex);

    const nextSection = sections[nextSectionIndex];
    const nextParams = new URLSearchParams(searchParams);

    if (!nextSection || nextSectionIndex === 0) {
      nextParams.delete('section');
    } else {
      nextParams.set('section', nextSection.id);
    }

    setSearchParams(nextParams, { replace: true });
  };

  return [currentSection, setCurrentSection];
}
