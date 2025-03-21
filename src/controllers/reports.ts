import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import axios from "axios";

export async function generate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  try {
    const { data } = await axios.get(
      process.env.API_URL + "/api/checklists/" + request.query.id,
      {
        headers: {
          Cookie:
            authorization ||
            "sidebar_state=false; MT_ID_SESSION=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5ZzNld1lTWExtSVFZemVrMGJpenl5OGhNVkUzb3NDYkNPY1BsVzZkeEJBIn0.eyJleHAiOjE3NDIyMTM0MzAsImlhdCI6MTc0MTc4MTQzMCwiYXV0aF90aW1lIjoxNzQxNzgxNDI4LCJqdGkiOiJlYTZhZmFlMC1mNzQxLTQwOGItYmY2ZC0yNzBkZWRjN2IyYjIiLCJpc3MiOiJodHRwczovL2Rldi5sb2dpbi5tdC5nb3YuYnIvYXV0aC9yZWFsbXMvbXQtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiY2Y1ZjEwZDMtNmMwNC00OTk2LWJjMDctYTFjMDhjNTJjODA3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicHJvamV0by10ZW1wbGF0ZS1pbnRlZ3JhY2FvIiwic2lkIjoiMWQ1NjBmMmYtMWQ1YS00ZDA2LTkyNWQtNTdkZTRhZjYzNWM2IiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm10LWxvZ2luIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImNpZGFkYW8tdmFsaWQtdXNlciIsImRldHJhbi12YWxpZC11c2VyIiwiZGVmYXVsdC1yb2xlcy1tdC1yZWFsbSIsInNlc3AtdmFsaWQtdXNlciIsIm10Y2lkYWRhby12YWxpZC11c2VyIiwic2VnZXMtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsImRlbGV0ZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvaWRjLW5vbmNlLWNvbXBhdGlibGUtbWFwcGVyIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZmlyc3ROYW1lIjoiVElBR08iLCJsYXN0TmFtZSI6IkRBTklMTyBERSBNQVRPUyBCQU5LT1ciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJUSUFHTyBEQU5JTE8gREUgTUFUT1MgQkFOS09XIiwiY3BmIjoiMDEyMzkwNzAxMjgiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIwMTIzOTA3MDEyOCIsImdpdmVuX25hbWUiOiJUSUFHTyIsImRhdGFOYXNjaW1lbnRvIjoiMTQvMDkvMTk5OSIsImZhbWlseV9uYW1lIjoiREFOSUxPIERFIE1BVE9TIEJBTktPVyIsIm5vbWVNYWUiOiJFTElTQU5FIE1PUkVJUkEgREUgTUFUT1MgQkFOS09XIiwiZW1haWwiOiJ0aWFnb2Jhbmtvd0BzZXBsYWcubXQuZ292LmJyIn0.XBbqekjWrurKWEXYLbzXsDuuDRW_A6k3V15Iu6EQexuHjHohQFlUe62q1ItgLVkYkk4DH7MfvJBubf4McvF86n1CnPDisb92SCsoxyja6DzH3uG1hX0oJOssRbU_Heb_ffcNmPJ4j9C6Mli15Z72lQ1_vrMtxPxZI51ZsNAb64En1LXxVLAtqtWepB98-xWW2m1nKIelTSgPSVWUzjA8YvWKHxI05S7fKNpHlbIOQsgc55oTJHHBO9hk8rKa3jd1VC0RToPJe6tFIIpjuMV513HtaHh-5G9S5vSOSRHmgKMlEoiXNZWeHUW3orBYZk_WcHcv6cJpYcPowthwr9yF8g; SESSION=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5Nzk2N2RjLWI1NTUtNGJjNC04ZDM1LTI0ZWQ4ODNiMDlhYiIsIm5hbWUiOiJUSUFHTyBEQU5JTE8gREUgTUFUT1MgQkFOS09XIiwiZW1haWwiOiJ0aWFnb2Jhbmtvd0BzZXBsYWcubXQuZ292LmJyIiwiY3BmIjoiMDEyMzkwNzAxMjgiLCJhdmF0YXIiOm51bGwsImlzX2FjdGl2ZSI6ZmFsc2UsImlzX2RlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNS0wMi0yMVQxNTozMDowMy4wOTRaIiwidXBkYXRlZF9hdCI6IjIwMjUtMDMtMTJUMTI6MDI6NTQuOTE0WiIsImlhdCI6MTc0MTc4MDk3NCwiZXhwIjozNDgzOTk0NDA0fQ.M5D1mxw8-1LN9j9g6D2V8-MX5fIW-qZGnfnpyMC64AY; USER_DATA=%7B%22id%22%3A%22197967dc-b555-4bc4-8d35-24ed883b09ab%22%2C%22name%22%3A%22TIAGO%20DANILO%20DE%20MATOS%20BANKOW%22%2C%22email%22%3A%22tiagobankow%40seplag.mt.gov.br%22%2C%22cpf%22%3A%2201239070128%22%2C%22avatar%22%3Anull%2C%22is_active%22%3Afalse%2C%22is_deleted%22%3Afalse%2C%22created_at%22%3A%222025-02-21T15%3A30%3A03.094Z%22%2C%22updated_at%22%3A%222025-03-12T12%3A02%3A54.914Z%22%7D",
        },
      }
    );
    return response.status(201).render("checklist", data);
  } catch (err: any) {
    if (err.response?.data) {
      next(
        new AppError(
          err.response?.data?.message,
          err.response?.data?.status_code
        )
      );
    }

    next(new AppError("unknown error"));
  }
}
