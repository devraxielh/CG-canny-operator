import React, { useState } from 'react';

const Theory = () => {
    const AccordionItem = ({ title, children }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border-b border-gray-200">
                <button
                className="flex justify-between items-center w-full py-4 px-6 text-left font-semibold"
                onClick={() => setIsOpen(!isOpen)}
                >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                <div className="py-4 px-6">
                    {children}
                </div>
                )}
            </div>
        );
    };
    return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Teoría del Operador Canny</h3>
                <div className="border border-gray-200 rounded-lg">
                    <AccordionItem title="¿Qué es el Operador Canny?">
                        <p>El Operador Canny es una técnica de procesamiento de imágenes utilizada para la detección de bordes, desarrollada por John F. Canny en 1986. Este operador emplea un algoritmo de múltiples etapas que mejora la detección de bordes al maximizar la relación señal-ruido y reducir la probabilidad de detección de bordes falsos.</p>
                    </AccordionItem>

                    <AccordionItem title="Fundamentos Matemáticos">
                        <p>El proceso del Operador Canny incluye varios pasos fundamentales:</p>
                        <ol className="list-decimal list-inside">
                            <li>Aplicación de un filtro Gaussiano para suavizar la imagen y reducir el ruido.</li>
                            <li>Cálculo de los gradientes de la imagen para encontrar la intensidad de los bordes.</li>
                            <li>Aplicación de la supresión de no-máximos para eliminar falsos bordes.</li>
                            <li>Uso de umbrales para la detección final de los bordes, aplicando la técnica de histéresis.</li>
                        </ol>
                    </AccordionItem>

                    <AccordionItem title="Proceso de Aplicación">
                        <ol className="list-decimal list-inside">
                            <li>Suavizado de la imagen mediante un filtro Gaussiano.</li>
                            <li>Cálculo de gradientes usando operadores de derivadas, como Sobel.</li>
                            <li>Aplicación de la supresión de no-máximos para obtener bordes nítidos.</li>
                            <li>Umbralización con histéresis para identificar los bordes definitivos.</li>
                        </ol>
                    </AccordionItem>

                    <AccordionItem title="Ventajas y Desventajas">
                        <h4 className="font-semibold">Ventajas:</h4>
                        <ul className="list-disc list-inside mb-2">
                            <li>Detecta bordes con mayor precisión que otros operadores.</li>
                            <li>Menor sensibilidad al ruido, gracias a la suavización inicial.</li>
                            <li>Proporciona bordes bien definidos y continuos.</li>
                        </ul>
                        <h4 className="font-semibold">Desventajas:</h4>
                        <ul className="list-disc list-inside">
                            <li>Más complejo y computacionalmente costoso que otros métodos.</li>
                            <li>La selección de umbrales es crítica y puede ser difícil de ajustar.</li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem title="Aplicaciones Prácticas">
                        <p>El Operador Canny se utiliza en diversas aplicaciones de procesamiento de imágenes y visión por computadora, incluyendo:</p>
                        <ul className="list-disc list-inside">
                            <li>Reconocimiento de patrones y objetos</li>
                            <li>Segmentación de imágenes médicas</li>
                            <li>Sistemas de asistencia al conductor en vehículos</li>
                            <li>Detección de características en imágenes satelitales</li>
                            <li>Aplicaciones de seguridad y vigilancia</li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem title="Comparación con Otros Operadores">
                        <p>El Operador Canny es uno de varios métodos de detección de bordes. Otros operadores comunes incluyen:</p>
                        <ul className="list-disc list-inside">
                            <li>Operador Sobel: Simple y eficiente, pero menos preciso que Canny.</li>
                            <li>Operador Prewitt: Similar al Sobel, pero usa diferentes valores en los kernels.</li>
                            <li>Operador Roberts: Más sensible al ruido y utiliza kernels más pequeños.</li>
                            <li>Operador Laplaciano: Detecta bordes usando segundas derivadas, más sensible al ruido.</li>
                        </ul>
                    </AccordionItem>
                </div>
            </div>
    );
};

export default Theory;