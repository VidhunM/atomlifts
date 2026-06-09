import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, Link, AlignLeft, AlignCenter, AlignRight, Trash2, Image as ImageIcon } from 'lucide-react';
import { API_BASE_URL } from '../config';

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const backendUrl = API_BASE_URL || 'http://localhost:5000';

  // Sync internal HTML state with external value when it changes externally
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command, argument = null) => {
    document.execCommand(command, false, argument);
    handleInput();
  };

  const addLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const triggerImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch(`${backendUrl}/api/upload`, {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await response.text();
      const imageUrl = data.startsWith('http') ? data : `${backendUrl}${data}`;
      
      // Focus the editor and insert image
      editorRef.current.focus();
      executeCommand('insertImage', imageUrl);
      
      // Clear file input value so same file can be uploaded again
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading editor image:', error);
      alert('Image upload failed');
    }
  };

  return (
    <div className="rich-text-editor border border-secondary rounded overflow-hidden bg-dark-lighter">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="d-none" 
      />

      {/* Toolbar resembling Google Docs / Rich Editors */}
      <div className="editor-toolbar d-flex flex-wrap gap-1 p-2 bg-dark border-bottom border-secondary align-items-center">
        <button type="button" onClick={() => executeCommand('bold')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Bold">
          <Bold size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('italic')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Italic">
          <Italic size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('underline')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Underline">
          <Underline size={16} />
        </button>
        <div className="vr bg-secondary mx-1 my-1" style={{ height: '16px', opacity: 0.3 }}></div>
        <button type="button" onClick={() => executeCommand('formatBlock', '<h1>')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Heading 1">
          <Heading1 size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('formatBlock', '<h2>')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Heading 2">
          <Heading2 size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('formatBlock', '<p>')} className="btn btn-sm btn-outline-secondary px-2 py-1 text-white border-0 hover-btn-editor small" title="Normal Text" style={{ fontSize: '0.75rem' }}>
          Paragraph
        </button>
        <div className="vr bg-secondary mx-1 my-1" style={{ height: '16px', opacity: 0.3 }}></div>
        <button type="button" onClick={() => executeCommand('insertUnorderedList')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Bulleted List">
          <List size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('insertOrderedList')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Numbered List">
          <ListOrdered size={16} />
        </button>
        <div className="vr bg-secondary mx-1 my-1" style={{ height: '16px', opacity: 0.3 }}></div>
        <button type="button" onClick={() => executeCommand('justifyLeft')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Align Left">
          <AlignLeft size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('justifyCenter')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Align Center">
          <AlignCenter size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('justifyRight')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Align Right">
          <AlignRight size={16} />
        </button>
        <div className="vr bg-secondary mx-1 my-1" style={{ height: '16px', opacity: 0.3 }}></div>
        <button type="button" onClick={addLink} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Insert Link">
          <Link size={16} />
        </button>
        <button type="button" onClick={triggerImageUpload} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Upload & Insert Image">
          <ImageIcon size={16} />
        </button>
        <button type="button" onClick={() => executeCommand('removeFormat')} className="btn btn-sm btn-outline-secondary p-1 text-white border-0 hover-btn-editor" title="Clear Formatting">
          <Trash2 size={16} />
        </button>
      </div>

      {/* Editable Content Window */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="editor-body p-3 text-white"
        style={{ minHeight: '280px', outline: 'none', background: '#111', overflowY: 'auto' }}
      ></div>

      <style>{`
        .hover-btn-editor:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: #3b82f6 !important;
        }
        .editor-body h1 {
          font-size: 1.8rem;
          color: white;
          margin-top: 10px;
        }
        .editor-body h2 {
          font-size: 1.4rem;
          color: white;
          margin-top: 10px;
        }
        .editor-body p {
          font-size: 1rem;
          color: #ccc;
        }
        .editor-body ul, .editor-body ol {
          padding-left: 20px;
          color: #ccc;
        }
        .editor-body a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .editor-body img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          margin: 10px 0;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
