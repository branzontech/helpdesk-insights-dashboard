import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bell } from "lucide-react";

export const NotificationIframeHint = () => {
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    const inIframe = window.top !== window.self;
    const supported = "Notification" in window;
    const perm: NotificationPermission = supported ? Notification.permission : "denied";

    if (inIframe && supported && perm !== "granted") {
      setReason(
        perm === "denied"
          ? "Las notificaciones del navegador suelen estar bloqueadas dentro de un iframe."
          : "Para conceder permisos, abre la app fuera de la vista previa."
      );
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const openNewTabAndRequest = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("requestNotifications", "1");
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-lg animate-in slide-in-from-bottom-5">
      <Alert className="bg-background border-primary/20 shadow-lg">
        <Bell className="h-4 w-4 text-primary" />
        <AlertTitle>Notificaciones en vista previa</AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p className="text-sm text-muted-foreground">
            {reason} Abre la aplicación en una nueva pestaña para habilitarlas correctamente.
          </p>
          <div className="flex gap-2">
            <Button onClick={openNewTabAndRequest} size="sm" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Abrir y activar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShow(false)}>
              Cerrar
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
