import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request: Request = context.switchToHttp().getRequest();

        console.log(`URL: ${request.url} - METHOD: ${request.method}`);
        console.log(`Tempo da execução: ${Date.now() - dt} milissegundos`);
      }),
    );
  }
}
