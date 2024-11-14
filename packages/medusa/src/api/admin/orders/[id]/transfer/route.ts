import { requestOrderTransferWorkflow } from "@medusajs/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { HttpTypes } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils"
import { AdminTransferOrderType } from "../../validators"

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminTransferOrderType>,
  res: MedusaResponse<HttpTypes.AdminOrderResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { id: req.params.id }

  await requestOrderTransferWorkflow(req.scope).run({
    input: {
      orderId: req.params.id,
      customerId: req.validatedBody.customer_id,
      loggedInUser: req.auth_context.actor_id,
      description: req.validatedBody.description,
      internalNote: req.validatedBody.internal_note,
    },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables,
    fields: req.remoteQueryConfig.fields,
  })

  const [order] = await remoteQuery(queryObject)
  res.status(200).json({ order })
}
