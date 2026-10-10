import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";

/**
 * Loads data with loading and error state.
 *   const { data, loading, error, reload } = useFetch(() => api.list(), [ filter ])
 * `deps` are the values the loader depends on (like useEffect).
 */
export function useFetch(loader, deps = []) {
    const [ state, setState ] = useState({ data: null, loading: true, error: "" })
    const [ tick, setTick ] = useState(0)

    useEffect(() => {
        let ignore = false

        setState((prev) => ({ ...prev, loading: true, error: "" }))

        loader()
            .then((data) => { if (!ignore) setState({ data, loading: false, error: "" }) })
            .catch((error) => { if (!ignore) setState({ data: null, loading: false, error: getErrorMessage(error) }) })

        return () => { ignore = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ...deps, tick ])

    const reload = useCallback(() => setTick((t) => t + 1), [])

    return { ...state, reload }
}
