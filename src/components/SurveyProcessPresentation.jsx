/* eslint-disable react/prop-types */

import { ArrowRight, Code, Layers, Send, CheckCircle } from "lucide-react";

const Slide = ({ title, content, icon }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-lg mb-4 w-full"
    style={{ maxWidth: "800px" }}
  >
    <div className="flex items-center mb-4">
      {icon && <span className="mr-3 text-blue-600">{icon}</span>}
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="text-sm text-gray-700">{content}</div>
  </div>
);

const CodeBlock = ({ code }) => (
  <pre className="bg-gray-100 p-3 rounded-lg text-xs overflow-auto max-h-48 shadow-inner mt-3 w-full">
    <code className="text-gray-800">{code}</code>
  </pre>
);

const SurveyProcessPresentation = () => (
  <div className="bg-gray-200 p-12 flex flex-col items-center">
    <div className="w-full max-w-4xl space-y-12">
      <Slide
        title="Proceso de Surveys: Del Backend al Frontend"
        icon={<ArrowRight size={24} />}
        content={
          <ul className="list-disc list-inside space-y-2">
            <li>Visión general del sistema de encuestas</li>
            <li>Flujo de datos desde el backend al frontend</li>
            <li>Flexibilidad y personalización en la creación de formularios</li>
          </ul>
        }
      />

      <Slide
        title="Ejemplo de JSON del Backend"
        icon={<Code size={24} />}
        content={
          <CodeBlock
            code={`
{
  "id": "survey123",
  "title": "Encuesta Socioeconómica",
  "code": "SOC2023",
  "description": "Encuesta para recopilar datos socioeconómicos",
  "status": true,
  "questions": [
    {
      "id": "q1",
      "survey_id": "survey123",
      "name": "edad",
      "label": "¿Cuál es tu edad?",
      "placeholder": "Ingresa tu edad",
      "order": 1,
      "validation": {"required":true,"min":18,"max":99},
      "type": "number"
    },
    {
      "id": "q2",
      "survey_id": "survey123",
      "name": "educacion",
      "label": "Nivel de educación más alto completado",
      "placeholder": "Selecciona una opción",
      "order": 2,
      "validation": {"required":true},
      "type": "select",
      "options": [
        {"id": "opt1", "question_id": "q2", "text": "Secundaria"},
        {"id": "opt2", "question_id": "q2", "text": "Preparatoria"},
        {"id": "opt3", "question_id": "q2", "text": "Universidad"}
      ]
    }
  ]
}
            `}
          />
        }
      />

      <Slide
        title="Procesamiento en el Frontend"
        icon={<Layers size={24} />}
        content={
          <>
            <ol className="list-decimal list-inside space-y-2 mb-3">
              <li>Recepción de Datos: useFetch para obtener survey</li>
              <li>Transformación: JSON a estructura de formulario</li>
              <li>Renderizado: Componente DynamicForm</li>
            </ol>
            <CodeBlock
              code={`
const { data: surveyData } = useFetch('getSurvey', {
  method: 'GET',
  urlParams: { id: surveyId }
});

const formStructure = {
  id: surveyData.id,
  fields: surveyData.questions.map(q => ({
    id: q.id,
    type: q.type,
    name: q.name,
    label: q.label,
    validation: JSON.parse(q.validation),
    options: q.options
  }))
};

return <DynamicForm structure={formStructure} />;
              `}
            />
          </>
        }
      />

      <Slide
        title="Renderizado del Formulario"
        icon={<Layers size={24} />}
        content={
          <>
            <ul className="list-disc list-inside space-y-2 mb-3">
              <li>
                Componente DynamicForm renderiza campos basados en formStructure
              </li>
              <li>Soporta: texto, número, select, radio, checkbox</li>
              <li>Implementa validación en tiempo real</li>
            </ul>
            <CodeBlock
              code={`
const DynamicForm = ({ structure }) => {
  const [formData, setFormData] = useState({});
  
  const renderField = (field) => {
    switch(field.type) {
      case 'text':
      case 'number':
        return <input type={field.type} name={field.name} />;
      case 'select':
        return (
          <select name={field.name}>
            {field.options.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.text}</option>
            ))}
          </select>
        );
      // ... otros tipos de campo
    }
  };

  return (
    <form>
      {structure.fields.map(field => (
        <div key={field.id}>
          <label>{field.label}</label>
          {renderField(field)}
        </div>
      ))}
    </form>
  );
};
              `}
            />
          </>
        }
      />

      <Slide
        title="Envío de Respuestas"
        icon={<Send size={24} />}
        content={
          <>
            <ol className="list-decimal list-inside space-y-2 mb-3">
              <li>Recopilación de datos del usuario en formData</li>
              <li>Validación final antes del envío</li>
              <li>useFetch para enviar respuestas al backend</li>
            </ol>
            <CodeBlock
              code={`
const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm(formData)) {
    try {
      await useFetch('submitSurvey', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      alert('Encuesta enviada con éxito');
    } catch (error) {
      alert('Error al enviar la encuesta');
    }
  }
};
              `}
            />
          </>
        }
      />

      <Slide
        title="Ventajas y Próximos Pasos"
        icon={<CheckCircle size={24} />}
        content={
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Ventajas:</h3>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Flexibilidad en modificaciones de encuestas</li>
                <li>Fácil adición de nuevos tipos de preguntas</li>
                <li>Centralización de lógica de validación</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Próximos pasos:</h3>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Implementar lógica condicional en preguntas</li>
                <li>Mejorar accesibilidad del formulario dinámico</li>
                <li>Añadir soporte para subpreguntas y matrices</li>
              </ul>
            </div>
          </div>
        }
      />
    </div>
  </div>
);

export default SurveyProcessPresentation;