import React from 'react';
import ParticlesBackground from './ParticlesBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import BackButton from './BackButton';

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-light-bg dark:bg-dark-bg">
      <ParticlesBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <BackButton />
        <main className="flex items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-light-text dark:text-dark-text">
              Política de Privacidad
            </h1>
            <div className="bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm p-8 rounded-lg shadow-lg space-y-6">
              <p className="text-lg text-light-text dark:text-dark-text">
                La presente Política de Privacidad establece los términos en que INOBRAND usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo, esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.
              </p>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
                  Información que es recogida
                </h2>
                <p className="text-lg text-light-text dark:text-dark-text">
                  Nuestro sitio web podrá recoger información personal por ejemplo: Nombre, información de contacto como su dirección de correo electrónica e información demográfica. De igual manera, cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
                  Uso de la información recogida
                </h2>
                <p className="text-lg text-light-text dark:text-dark-text">
                  Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios. Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  INOBRAND está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
                  Facebook Pixel
                </h2>
                <p className="text-lg text-light-text dark:text-dark-text">
                  Facebook Pixel es un servicio analítico y de monitoreo de web prestado por Facebook, Inc., una compañía de California cuya oficina principal está en 1 Hacker Way, 94025 Menlo Park (California), CA 94043, Estados Unidos ("Facebook").
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Facebook utiliza "cookies" y "píxel", que son archivos de texto y archivos de imagen ubicados en el ordenador del Usuario, para ayudar al sitio web a analizar el uso que hacen los usuarios del sitio web, y planificar campañas de publicidad dirigidas a personas con interés en nuestros productos y servicios.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  La información que genera las "cookies" y "pixels" acerca del uso del Usuario del website (incluyendo su dirección IP) será directamente transmitida y archivada por Facebook. Facebook usará esta información por cuenta nuestra con el propósito de seguir la pista de su uso del website y "marcar" a los usuarios con interés en nuestros productos y servicios, recopilando informes de la actividad del website.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Facebook podrá transmitir dicha información a terceros cuando así se lo requiera la legislación, o cuando dichos terceros procesen la información por cuenta de Facebook. Facebook no asociará su dirección IP con ningún otro dato del que disponga.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Como usuario, y en ejercicio de sus derechos, puede rechazar el tratamiento de los datos o la información rechazando el uso de cookies mediante la selección de la configuración apropiada de su navegador, sin embargo, debe saber que si lo hace puede que no pueda usar la plena funcionabilidad de este sitio web.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Al utilizar esta web, de acuerdo a la información facilitada en esta Política de Privacidad, aceptas el tratamiento de datos por parte de Facebook en la forma y para los fines indicados.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Para más información, puedes consultar la política de privacidad de Facebook en <a href="https://www.facebook.com/policy.php" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" target="_blank" rel="noopener noreferrer">https://www.facebook.com/policy.php</a>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
                  Cookies
                </h2>
                <p className="text-lg text-light-text dark:text-dark-text">
                  Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas la web puede reconocerle individualmente y por tanto brindarle el mejor servicio personalizado de su web.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estas no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
                  Enlaces a Terceros
                </h2>
                <p className="text-lg text-light-text dark:text-dark-text">
                  Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre el sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
                  Control de su información personal
                </h2>
                <p className="text-lg text-light-text dark:text-dark-text">
                  En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web. Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con una orden judicial.
                </p>
                <p className="text-lg text-light-text dark:text-dark-text mt-4">
                  INOBRAND se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;