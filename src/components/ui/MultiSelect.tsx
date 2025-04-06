import React, { useState, useEffect, useRef } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options...',
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: string) => {
    const isSelected = selectedValues.includes(option);
    if (isSelected) {
      onChange(selectedValues.filter(item => item !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter(item => item !== option));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className={cn(
          "border border-border bg-background rounded-md min-h-10 p-1 flex flex-wrap items-center gap-1 cursor-pointer",
          isOpen && "ring-1 ring-primary",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedValues.length === 0 ? (
          <span className="px-2 py-1 text-muted-foreground">{placeholder}</span>
        ) : (
          <>
            {selectedValues.map(value => (
              <span 
                key={value} 
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md flex items-center gap-1"
              >
                {value}
                {!disabled && (
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-destructive" 
                    onClick={(e) => removeOption(value, e)}
                  />
                )}
              </span>
            ))}
          </>
        )}
        <ChevronDown size={16} className="ml-auto text-muted-foreground" />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-muted-foreground">No options available</div>
          ) : (
            options.map(option => (
              <div
                key={option}
                className={cn(
                  "px-3 py-2 hover:bg-secondary flex items-center gap-2 cursor-pointer",
                  selectedValues.includes(option) && "bg-secondary"
                )}
                onClick={() => toggleOption(option)}
              >
                <div className={cn(
                  "w-4 h-4 rounded-sm border flex items-center justify-center",
                  selectedValues.includes(option) ? "bg-primary border-primary" : "border-input"
                )}>
                  {selectedValues.includes(option) && <Check size={12} className="text-primary-foreground" />}
                </div>
                <span>{option}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect; 