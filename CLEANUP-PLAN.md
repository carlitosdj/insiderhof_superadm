# Plano de Limpeza - SuperAdmin

> **Objetivo:** Remover tudo que é cópia do `adm` e deixar o `superadm` apenas com sua função real: **gerenciar tenants da plataforma**.
>
> **O que fica:** Auth, Errors, Tenants, e a infraestrutura mínima (api, store base).
>
> **O que sai:** Products, Modules, Classes, Launches, Offers, LPs, Sales, Users, Leads, Emails, WhatsApp, Comments, Annotations, Support, Events, Ideation, ROAS, Projects, e todo o resto que pertence ao `adm`.

---

## Fase 1 - Remover pastas de páginas admin ✅

Remover todas as pastas em `src/app/pages/admin/` **exceto** `tenants/`:

- [x] Remover `src/app/pages/admin/annotations/`
- [x] Remover `src/app/pages/admin/comments/`
- [x] Remover `src/app/pages/admin/contact/`
- [x] Remover `src/app/pages/admin/dclass/`
- [x] Remover `src/app/pages/admin/dclassextra/`
- [x] Remover `src/app/pages/admin/dlaunch/`
- [x] Remover `src/app/pages/admin/dlaunchhasoffers/`
- [x] Remover `src/app/pages/admin/dlaunchphase/`
- [x] Remover `src/app/pages/admin/dlaunchphaseextra/`
- [x] Remover `src/app/pages/admin/dlpfeatures/`
- [x] Remover `src/app/pages/admin/dlps/`
- [x] Remover `src/app/pages/admin/dlpsessions/`
- [x] Remover `src/app/pages/admin/dmodules/`
- [x] Remover `src/app/pages/admin/dofferhasproduct/`
- [x] Remover `src/app/pages/admin/doffers/`
- [x] Remover `src/app/pages/admin/dproducts/`
- [x] Remover `src/app/pages/admin/events/`
- [x] Remover `src/app/pages/admin/extra/`
- [x] Remover `src/app/pages/admin/ideaction/`
- [x] Remover `src/app/pages/admin/leads/`
- [x] Remover `src/app/pages/admin/massmails/`
- [x] Remover `src/app/pages/admin/projects/`
- [x] Remover `src/app/pages/admin/roasplanner/`
- [x] Remover `src/app/pages/admin/sbusiness/`
- [x] Remover `src/app/pages/admin/sells/`
- [x] Remover `src/app/pages/admin/singlemails/`
- [x] Remover `src/app/pages/admin/supports/`
- [x] Remover `src/app/pages/admin/users/`
- [x] Remover `src/app/pages/admin/wppcamp/`
- [x] Remover `src/app/pages/admin/wppgroup/`

---

## Fase 2 - Remover outras pastas de páginas desnecessárias ✅

- [x] Remover `src/app/pages/dashboard/`
- [x] Remover `src/app/pages/layout-builder/`
- [x] Remover `src/app/pages/crop/`
- [x] Remover `src/app/pages/MenuTestPage.tsx`

---

## Fase 3 - Remover módulos desnecessários ✅

Remover em `src/app/modules/` **exceto** `auth/` e `errors/`:

- [x] Remover `src/app/modules/accounts/`
- [x] Remover `src/app/modules/apps/`
- [x] Remover `src/app/modules/profile/`
- [x] Remover `src/app/modules/widgets/`
- [x] Remover `src/app/modules/wizards/`

---

## Fase 4 - Remover store ducks desnecessários ✅

Remover todas as pastas em `src/store/ducks/` **exceto** `me/`, `users/`, `state/` e `tenants/`:

- [x] Remover `src/store/ducks/annotation/`
- [x] Remover `src/store/ducks/annotations/`
- [x] Remover `src/store/ducks/carts/`
- [x] Remover `src/store/ducks/city/`
- [x] Remover `src/store/ducks/comments/`
- [x] Remover `src/store/ducks/contact/`
- [x] Remover `src/store/ducks/davailableclass/`
- [x] Remover `src/store/ducks/davailablemodule/`
- [x] Remover `src/store/ducks/davailableproduct/`
- [x] Remover `src/store/ducks/dclass/`
- [x] Remover `src/store/ducks/dclassextra/`
- [x] Remover `src/store/ducks/dlaunch/`
- [x] Remover `src/store/ducks/dlaunchhasoffers/`
- [x] Remover `src/store/ducks/dlaunchphase/`
- [x] Remover `src/store/ducks/dlaunchphaseextras/`
- [x] Remover `src/store/ducks/dlaunchquestion/`
- [x] Remover `src/store/ducks/dlaunchquestionoption/`
- [x] Remover `src/store/ducks/dlpfeatures/`
- [x] Remover `src/store/ducks/dlps/`
- [x] Remover `src/store/ducks/dlpsessions/`
- [x] Remover `src/store/ducks/dmodule/`
- [x] Remover `src/store/ducks/doffer/`
- [x] Remover `src/store/ducks/dofferhasproduct/`
- [x] Remover `src/store/ducks/dproduct/`
- [x] Remover `src/store/ducks/emailToList/`
- [x] Remover `src/store/ducks/eventcheckins/`
- [x] Remover `src/store/ducks/eventrsvps/`
- [x] Remover `src/store/ducks/events/`
- [x] Remover `src/store/ducks/eventsessions/`
- [x] Remover `src/store/ducks/eventtickets/`
- [x] Remover `src/store/ducks/extras/`
- [x] Remover `src/store/ducks/ideaction/`
- [x] Remover `src/store/ducks/lead/`
- [x] Remover `src/store/ducks/leads/`
- [x] Remover `src/store/ducks/lists/`
- [x] Remover `src/store/ducks/massmail/`
- [x] Remover `src/store/ducks/onlineusers/`
- [x] Remover `src/store/ducks/projects/`
- [x] Remover `src/store/ducks/singlemail/`
- [x] Remover `src/store/ducks/support/`
- [x] Remover `src/store/ducks/wppcamp/`
- [x] Remover `src/store/ducks/wppgroup/`

---

## Fase 5 - Remover services desnecessários ✅

- [x] Remover `src/services/eventArtifactsService.ts`
- [x] Remover `src/services/eventCheckinsService.ts`
- [x] Remover `src/services/eventRsvpsService.ts`
- [x] Remover `src/services/eventSessionsService.ts`
- [x] Remover `src/services/eventSpeakersService.ts`
- [x] Remover `src/services/eventTicketsService.ts`
- [x] Remover `src/services/eventsService.ts`

---

## Fase 6 - Atualizar PrivateRoutes.tsx ✅

- [x] Remover todos os imports de páginas removidas (lazy imports)
- [x] Remover todas as rotas exceto: `/tenants`, `/tenants/:tenantId`
- [x] Alterar redirect padrão de `/products` para `/tenants`
- [x] Manter rotas de `/auth/*`

---

## Fase 7 - Atualizar sidebar menu ✅

- [x] Remover seção "Projects"
- [x] Remover seção "PRODUTOS" (Products, Offers, Launches, Events)
- [x] Remover seção "GESTÃO" (Vendas)
- [x] Remover seção "USUÁRIOS" (Alunos, Prospectos, Leads)
- [x] Remover seção "COMUNICAÇÃO" (Anotações, Comentários, Emails, WhatsApp)
- [x] Remover seção "SUPORTE"
- [x] Remover seção "FERRAMENTAS" (Ideação, ROAS)
- [x] Manter item "Tenants" como item principal (sem condição de super-admin)

---

## Fase 8 - Atualizar rootReducer.ts ✅

- [x] Remover todos os imports de reducers removidos
- [x] Manter apenas: `me`, `users`, `tenants`
- [x] Atualizar o `combineReducers` para incluir apenas os reducers mantidos

---

## Fase 9 - Atualizar rootSaga.ts ✅

- [x] Remover todos os imports de sagas removidas
- [x] Manter apenas sagas de: `me` e `tenants`
- [x] Atualizar a função `rootSaga()` para incluir apenas os takeLatest mantidos

---

## Fase 10 - Atualizar store/index.ts ✅

- [x] Remover todas as importações de tipos de state removidos
- [x] Atualizar interface `ApplicationState` para incluir apenas: `me`, `users`, `tenants`

---

## Fase 11 - Limpar api.ts ✅

- [x] Removidas funções de UTM/Lead que não são usadas no superadm
- [x] Mantidos interceptors de `Authorization`, `x-tenant-id` e `x-project-id`

---

## Fase 12 - Build e verificação ✅

- [x] Rodar `npm run build` e corrigir erros de compilação TypeScript
- [x] Corrigir imports órfãos: `Card2.tsx`, `ProjectSelector.tsx`, `events/` components
- [x] Corrigir `me/types.ts` (dependências de `city` e `dclass` types)
- [x] Corrigir `Auth.tsx` (dependência de `projects/actions`)
- [x] Corrigir `SidebarMenu.tsx` (dependência de `ProjectSelector`)
- [x] Build final passou com sucesso

---

## Fase 13 - Limpeza final

- [ ] Verificar `package.json` por dependências que podem ser removidas (ex: CKEditor, TinyMCE, ApexCharts, xlsx, react-image-crop, etc. se não usados nos tenants)
- [ ] Testar navegação: login -> /tenants -> /tenants/:id
- [ ] Verificar que sidebar mostra apenas "Tenants"

---

## Resumo do que FICA no superadm

```
src/
├── _metronic/           (framework UI - simplificado)
├── app/
│   ├── components/
│   │   └── (eventos removidos, ProjectSelector removido)
│   ├── modules/
│   │   ├── auth/        (login/logout)
│   │   └── errors/      (páginas de erro)
│   ├── pages/
│   │   └── admin/
│   │       └── tenants/ (ÚNICA funcionalidade admin)
│   └── routing/
│       └── PrivateRoutes.tsx (apenas rotas de tenants)
├── services/
│   ├── api.ts
│   ├── apiRepo.ts
│   ├── tenantsService.ts
│   ├── tenantDomainsService.ts
│   ├── tenantSettingsService.ts
│   ├── tenantUsersService.ts
│   └── paymentGatewaysService.ts
└── store/
    └── ducks/
        ├── me/          (autenticação)
        ├── users/       (suporte a auth)
        ├── tenants/     (gestão de tenants)
        └── state/       (estados BR - manter por ora)
```
