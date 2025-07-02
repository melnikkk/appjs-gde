import { useEffect, useRef } from 'react';

interface Props {
  scriptContent: string | undefined;
  isLoading: boolean;
}

export const ScriptContentHtmlPreview: React.FC<Props> = ({
  scriptContent,
  isLoading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptContent || !containerRef.current) {
      return;
    }

    try {
      containerRef.current.innerHTML = '';

      const tempDiv = document.createElement('div');

      tempDiv.innerHTML = scriptContent;

      while (tempDiv.firstChild) {
        containerRef.current.appendChild(tempDiv.firstChild);
      }

      const scripts = containerRef.current.querySelectorAll('script');

      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');

        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Failed to render preview');
    }
  }, [scriptContent]);

  if (isLoading) {
    return <div className="py-8 text-center">Loading preview...</div>;
  }

  if (!scriptContent) {
    return <div className="py-4 text-center">No preview available</div>;
  }

  return (
    <div className="h-full overflow-auto rounded-md">
      <div ref={containerRef} className="h-full w-full rounded-md" />
    </div>
  );
};
