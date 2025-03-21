'use client';

import styles from '@components/TreeView.module.scss';

import * as React from 'react';

interface TreeViewProps {
  defaultValue?: boolean;
  title: string;
  children?: React.ReactNode;
  depth?: number;
  isFile?: boolean;
  isRoot?: boolean;
  isLastChild?: boolean;
  parentLines?: boolean[];
  href?: string;
  onClick?: () => void;
}

const TreeView: React.FC<TreeViewProps> = ({ 
  defaultValue = false, 
  title, 
  children, 
  depth = 0, 
  isFile = false, 
  isRoot = false, 
  isLastChild = false, 
  parentLines = [],
  href,
  onClick
}) => {
  const [show, setShow] = React.useState<boolean>(defaultValue);

  const onToggleShow = (): void => {
    if (isFile) {
      if (href) {
        window.open(href, '_blank');
      }
      if (onClick) {
        onClick();
      }
    } else {
      setShow((prevShow) => !prevShow);
    }
  };

  const hasChildren = React.Children.count(children) > 0;
  const isEmptyFolder = !isFile && !hasChildren;

  const spacing = parentLines.map((line) => (line ? '│ . ' : '. . ')).join('');
  const endPrefix = isLastChild ? '└───' : '├───';
  const prefix = `${spacing}${endPrefix}`;
  const icon = isFile ? '📄 ' : show ? '╦ ' : '╤ ';

  const updatedParentLines = [...parentLines, !isLastChild];

  return (
    <div className={styles.root}>
      <div 
        tabIndex={0} 
        role={isFile ? "link" : "button"} 
        onClick={onToggleShow} 
        className={`${styles.item} ${isFile && href ? styles.file : ''}`} 
        aria-expanded={show}
      >
        {prefix}
        {icon}
        {title}
      </div>
      {show && hasChildren && (
        <div>
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<TreeViewProps>, {
                  depth: depth + 1,
                  isLastChild: index === React.Children.count(children) - 1,
                  parentLines: updatedParentLines,
                })
              : child
          )}
        </div>
      )}
    </div>
  );
};

export default TreeView;
