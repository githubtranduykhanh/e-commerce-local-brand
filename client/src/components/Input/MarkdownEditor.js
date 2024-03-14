import React, { useRef,memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkdownEditor = ({lable,changeValue,value = '',name,invalidFields, setInvalidFields}) => {
  return (
    <div>
      {lable && <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor={`MarkdownEditor-${name}`}>{lable}</label>}  
      <div className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '>
        <Editor
            id={`MarkdownEditor-${name}`}
            apiKey={process.env.REACT_APP_MCETINY || 'shdluk044hiro83qjkycgwyvn3uzi71h2nfgt5ltag50bekj'}
            initialValue={value}
            init={{
            height: 500,
            menubar: true,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onChange={(e) => changeValue(prve => ({...prve,[name]:e.target.getContent()}))}
            onFocus={() => setInvalidFields && setInvalidFields([])}
        />
      </div>
      {invalidFields.some(el => el?.name === name) && <small className='text-xs text-red-500'>{invalidFields?.find(el => el?.name ===  name)?.message}</small>}
    </div>
  );
}


export default memo(MarkdownEditor)