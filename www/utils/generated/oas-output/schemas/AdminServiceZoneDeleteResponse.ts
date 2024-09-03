/**
 * @schema AdminServiceZoneDeleteResponse
 * type: object
 * description: SUMMARY
 * x-schemaName: AdminServiceZoneDeleteResponse
 * required:
 *   - id
 *   - object
 *   - deleted
 * properties:
 *   id:
 *     type: string
 *     title: id
 *     description: The fulfillment set's ID.
 *   object:
 *     type: string
 *     title: object
 *     description: The name of the deleted object.
 *   deleted:
 *     type: boolean
 *     title: deleted
 *     description: Whether the Fulfillment Set was deleted.
 *   parent:
 *     $ref: "#/components/schemas/AdminFulfillmentSet"
 * 
*/
