import type { SectionKey } from "../FormsData/types";

interface FormField {
  fieldName: string;
  inputId: string;
  type: string;
  placeholder: string;
  isBigInput?: boolean;
  required?: boolean;
}

interface ExceptionalProps {
  hasAddButton: boolean;
  editMode: boolean;
  onConfirmEdit: () => void;
  onDiscardEdit: () => void;
  onAdd: () => void;
}

interface FormProps {
  formName: string;
  formIconClass: string;
  formFields: FormField[];
  formData?: Record<string, string>;
  sectionKey: SectionKey;
  isActive: boolean;
  onExpand: () => void;
  onChange: (sectionKey: SectionKey, inputId: string, value: string) => void;
}

interface FormBlockProps extends FormProps, Partial<ExceptionalProps> {}

export default function FormBlock(formBlockProps: FormBlockProps) {
  return (
    <div className="form-section">
      <form>
        <h2
          onClick={formBlockProps.onExpand}
          className="form-name"
        >
          <i className={formBlockProps.formIconClass}></i>{" "}
          {formBlockProps.formName}
        </h2>

        <div
          className={`expand-collapse ${
            formBlockProps.isActive ? "expanded" : "collapsed"
          }`}
        >
          {formBlockProps.formFields.map((field: FormField) => (
            <div key={field.inputId} className="mb-4 field-fade-in">
              <label className="form-label" htmlFor={field.inputId}>
                {field.fieldName}
              </label>

              {field.isBigInput ? (
                <textarea
                  className="form-input"
                  id={field.inputId}
                  placeholder={field.placeholder}
                  value={formBlockProps.formData?.[field.inputId] || ""}
                  required={field.required}
                  onChange={(e) =>
                    formBlockProps.onChange(
                      formBlockProps.sectionKey,
                      field.inputId,
                      e.target.value
                    )
                  }
                  rows={4}
                  maxLength={100}
                />
              ) : (
                <input
                  className="form-input"
                  id={field.inputId}
                  type={field.type}
                  placeholder={field.placeholder}
                  maxLength={30}
                  value={formBlockProps.formData?.[field.inputId] || ""}
                  required={field.required}
                  onChange={(e) =>
                    formBlockProps.onChange(
                      formBlockProps.sectionKey,
                      field.inputId,
                      e.target.value
                    )
                  }
                />
              )}
            </div>
          ))}

          {formBlockProps.editMode ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => formBlockProps.onDiscardEdit?.()}
                className="discard-btn"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => formBlockProps.onConfirmEdit?.()}
                className="confirm-btn"
              >
                Confirm
              </button>
            </div>
          ) : (
            formBlockProps?.hasAddButton && (
              <button
                onClick={() => formBlockProps.onAdd?.()}
                type="button"
                className="add-btn"
              >
                Add
              </button>
            )
          )}
        </div>
      </form>
    </div>
  );
}
